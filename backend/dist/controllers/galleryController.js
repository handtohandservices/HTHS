"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.listItems = exports.uploadImage = void 0;
const zod_1 = require("zod");
const multer_1 = __importDefault(require("multer"));
const galleryService_1 = require("../services/galleryService");
const cloudinary_1 = require("../config/cloudinary");
const error_1 = require("../middlewares/error");
const ApiError_1 = require("../utils/ApiError");
const response_1 = require("../utils/response");
function getTokenFromHeader(req) {
    const header = req.headers['authorization'] || '';
    return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
}
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: MAX_IMAGE_SIZE },
    fileFilter: (_req, file, cb) => {
        const allowedMimeTypes = [
            'image/jpeg',
            'image/jpg',
            'image/pjpeg',
            'image/png',
            'image/x-png',
            'image/webp',
            'image/gif',
            'image/avif',
        ];
        if (!allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
            cb(new ApiError_1.ApiError(400, 'invalid_file', 'Gallery item must be a JPEG, PNG, WEBP, AVIF, or GIF image.'));
            return;
        }
        cb(null, true);
    },
});
exports.uploadImage = upload.single('image');
const createSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required.').max(200),
    category: zod_1.z.string().min(1, 'Category is required.').max(100),
    category_slug: zod_1.z.string().min(1, 'Category slug is required.').max(100),
    location: zod_1.z.string().min(1, 'Location is required.').max(200),
    alt: zod_1.z.string().optional().transform((v) => v || ''),
});
exports.listItems = (0, error_1.asyncHandler)(async (_req, res, _next) => {
    const items = await galleryService_1.galleryService.list();
    (0, response_1.ok)(res, items);
});
exports.createItem = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const token = getTokenFromHeader(req);
    if (!token) {
        throw ApiError_1.ApiError.unauthorized('No session token provided.');
    }
    if (!req.file) {
        throw ApiError_1.ApiError.badRequest('Please attach an image file.');
    }
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
        throw ApiError_1.ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
    }
    // Upload Image to Cloudinary
    const originalName = req.file.originalname || 'gallery_image.jpg';
    const uploaded = await cloudinary_1.cloudinaryUploader.uploadImage(req.file.buffer, originalName);
    try {
        const id = await galleryService_1.galleryService.create({
            ...parsed.data,
            src: uploaded.url,
            image_public_id: uploaded.public_id,
        }, token);
        (0, response_1.created)(res, { id, src: uploaded.url });
    }
    catch (err) {
        // Roll back the upload if DB insert fails
        await cloudinary_1.cloudinaryUploader.remove(uploaded.public_id, 'image');
        throw err;
    }
});
exports.updateItem = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const { id } = req.params;
    const token = getTokenFromHeader(req);
    if (!token) {
        throw ApiError_1.ApiError.unauthorized('No session token provided.');
    }
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
        throw ApiError_1.ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
    }
    // Get the existing item to find the image details
    const items = await galleryService_1.galleryService.list();
    const target = items.find((it) => it.id === id);
    if (!target) {
        throw ApiError_1.ApiError.notFound('Gallery item not found.');
    }
    let src = target.src;
    let image_public_id = target.image_public_id;
    // If a new file is uploaded
    if (req.file) {
        // Upload new image
        const originalName = req.file.originalname || 'gallery_image.jpg';
        const uploaded = await cloudinary_1.cloudinaryUploader.uploadImage(req.file.buffer, originalName);
        src = uploaded.url;
        image_public_id = uploaded.public_id;
        // Delete the old image if it was on Cloudinary
        if (target.image_public_id) {
            await cloudinary_1.cloudinaryUploader.remove(target.image_public_id, 'image');
        }
    }
    const updated = await galleryService_1.galleryService.update(id, {
        ...parsed.data,
        src,
        image_public_id,
    }, token);
    if (!updated) {
        // Roll back the uploaded image if DB update fails
        if (req.file && image_public_id) {
            await cloudinary_1.cloudinaryUploader.remove(image_public_id, 'image');
        }
        throw ApiError_1.ApiError.notFound('Gallery item not found or session invalid.');
    }
    (0, response_1.ok)(res, { id, src, updated: true });
});
exports.deleteItem = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const { id } = req.params;
    const token = getTokenFromHeader(req);
    if (!token) {
        throw ApiError_1.ApiError.unauthorized('No session token provided.');
    }
    // Best-effort: fetch the record first so we can delete the Cloudinary asset
    const items = await galleryService_1.galleryService.list();
    const target = items.find((it) => it.id === id);
    if (target?.image_public_id) {
        await cloudinary_1.cloudinaryUploader.remove(target.image_public_id, 'image');
    }
    const removed = await galleryService_1.galleryService.remove(id, token);
    if (!removed)
        throw ApiError_1.ApiError.notFound('Gallery item not found or session invalid.');
    (0, response_1.ok)(res, { id, deleted: true });
});
//# sourceMappingURL=galleryController.js.map
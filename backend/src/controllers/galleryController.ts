import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import multer from 'multer';
import { galleryService } from '../services/galleryService';
import { cloudinaryUploader } from '../config/cloudinary';
import { asyncHandler } from '../middlewares/error';
import { ApiError } from '../utils/ApiError';
import { ok, created } from '../utils/response';

function getTokenFromHeader(req: Request): string {
  const header = req.headers['authorization'] || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const upload = multer({
  storage: multer.memoryStorage(),
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
      cb(new ApiError(400, 'invalid_file', 'Gallery item must be a JPEG, PNG, WEBP, AVIF, or GIF image.'));
      return;
    }
    cb(null, true);
  },
});

export const uploadImage = upload.single('image');

const createSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(200),
  category: z.string().min(1, 'Category is required.').max(100),
  category_slug: z.string().min(1, 'Category slug is required.').max(100),
  location: z.string().min(1, 'Location is required.').max(200),
  alt: z.string().optional().transform((v) => v || ''),
});

export const listItems = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const items = await galleryService.list();
    ok(res, items);
  }
);

export const createItem = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const token = getTokenFromHeader(req);
    if (!token) {
      throw ApiError.unauthorized('No session token provided.');
    }

    if (!req.file) {
      throw ApiError.badRequest('Please attach an image file.');
    }

    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      throw ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
    }

    // Upload Image to Cloudinary
    const originalName = req.file.originalname || 'gallery_image.jpg';
    const uploaded = await cloudinaryUploader.uploadImage(req.file.buffer, originalName);

    try {
      const id = await galleryService.create(
        {
          ...parsed.data,
          src: uploaded.url,
          image_public_id: uploaded.public_id,
        },
        token
      );
      created(res, { id, src: uploaded.url });
    } catch (err) {
      // Roll back the upload if DB insert fails
      await cloudinaryUploader.remove(uploaded.public_id, 'image');
      throw err;
    }
  }
);

export const updateItem = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const token = getTokenFromHeader(req);
    if (!token) {
      throw ApiError.unauthorized('No session token provided.');
    }

    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      throw ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
    }

    // Get the existing item to find the image details
    const items = await galleryService.list();
    const target = items.find((it) => it.id === id);
    if (!target) {
      throw ApiError.notFound('Gallery item not found.');
    }

    let src = target.src;
    let image_public_id = target.image_public_id;

    // If a new file is uploaded
    if (req.file) {
      // Upload new image
      const originalName = req.file.originalname || 'gallery_image.jpg';
      const uploaded = await cloudinaryUploader.uploadImage(req.file.buffer, originalName);
      src = uploaded.url;
      image_public_id = uploaded.public_id;

      // Delete the old image if it was on Cloudinary
      if (target.image_public_id) {
        await cloudinaryUploader.remove(target.image_public_id, 'image');
      }
    }

    const updated = await galleryService.update(
      id,
      {
        ...parsed.data,
        src,
        image_public_id,
      },
      token
    );

    if (!updated) {
      // Roll back the uploaded image if DB update fails
      if (req.file && image_public_id) {
        await cloudinaryUploader.remove(image_public_id, 'image');
      }
      throw ApiError.notFound('Gallery item not found or session invalid.');
    }

    ok(res, { id, src, updated: true });
  }
);

export const deleteItem = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const token = getTokenFromHeader(req);
    if (!token) {
      throw ApiError.unauthorized('No session token provided.');
    }

    // Best-effort: fetch the record first so we can delete the Cloudinary asset
    const items = await galleryService.list();
    const target = items.find((it) => it.id === id);
    if (target?.image_public_id) {
      await cloudinaryUploader.remove(target.image_public_id, 'image');
    }

    const removed = await galleryService.remove(id, token);
    if (!removed) throw ApiError.notFound('Gallery item not found or session invalid.');
    ok(res, { id, deleted: true });
  }
);

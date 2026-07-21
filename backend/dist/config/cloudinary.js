"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUploader = void 0;
require("dotenv/config");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
const getRequiredEnv = (name) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
};
cloudinary_1.v2.config({
    cloud_name: getRequiredEnv('CLOUDINARY_CLOUD_NAME'),
    api_key: getRequiredEnv('CLOUDINARY_API_KEY'),
    api_secret: getRequiredEnv('CLOUDINARY_API_SECRET'),
    secure: true,
});
exports.cloudinaryUploader = {
    /**
     * Upload a PDF buffer to Cloudinary as a raw resource.
     * Returns { url, public_id }.
     */
    async uploadPdf(buffer, filename) {
        const publicId = `resumes/${filename.replace(/\.[^.]+$/, '')}-${Date.now()}`;
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                resource_type: 'raw',
                public_id: publicId,
                format: 'pdf',
            }, (err, result) => {
                if (err || !result) {
                    reject(err || new Error('Cloudinary upload failed.'));
                    return;
                }
                resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            });
            stream_1.Readable.from(buffer).pipe(uploadStream);
        });
    },
    /**
     * Delete a file from Cloudinary by public_id.
     */
    async remove(publicId) {
        try {
            await cloudinary_1.v2.uploader.destroy(publicId, {
                resource_type: 'raw',
            });
        }
        catch (err) {
            // Non-fatal — log and continue
            console.error('[cloudinary] delete failed:', err);
        }
    },
};
//# sourceMappingURL=cloudinary.js.map
import 'dotenv/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

const getRequiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

cloudinary.config({
  cloud_name: getRequiredEnv('CLOUDINARY_CLOUD_NAME'),
  api_key: getRequiredEnv('CLOUDINARY_API_KEY'),
  api_secret: getRequiredEnv('CLOUDINARY_API_SECRET'),
  secure: true,
});

export const cloudinaryUploader = {
  /**
   * Upload a PDF buffer to Cloudinary as a raw resource.
   * Returns { url, public_id }.
   */
  async uploadPdf(
    buffer: Buffer,
    filename: string
  ): Promise<{ url: string; public_id: string }> {
    const publicId = `resumes/${filename.replace(/\.[^.]+$/, '')}-${Date.now()}`;

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          public_id: publicId,
          format: 'pdf',
        },
        (err, result?: UploadApiResponse) => {
          if (err || !result) {
            reject(err || new Error('Cloudinary upload failed.'));
            return;
          }

          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });
  },

  /**
   * Upload an image buffer to Cloudinary.
   * Returns { url, public_id }.
   */
  async uploadImage(
    buffer: Buffer,
    filename: string
  ): Promise<{ url: string; public_id: string }> {
    const publicId = `gallery/${filename.replace(/\.[^.]+$/, '')}-${Date.now()}`;

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          public_id: publicId,
        },
        (err, result?: UploadApiResponse) => {
          if (err || !result) {
            reject(err || new Error('Cloudinary image upload failed.'));
            return;
          }

          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });
  },

  /**
   * Delete a file from Cloudinary by public_id.
   */
  async remove(publicId: string, resourceType: 'raw' | 'image' = 'raw'): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });
    } catch (err) {
      // Non-fatal — log and continue
      console.error('[cloudinary] delete failed:', err);
    }
  },
};
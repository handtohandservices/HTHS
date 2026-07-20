import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: 'dqxm4urze',
  api_key: '612826174234773',
  api_secret: 'mFbj0nLI_EGcajsvW7zN2S1g8vI',
  secure: true,
});

export const cloudinaryUploader = {
  /**
   * Upload a PDF buffer to Cloudinary as a raw resource.
   * Returns { url, public_id }.
   */
  async uploadPdf(buffer: Buffer, filename: string): Promise<{ url: string; public_id: string }> {
    const publicId = `resumes/${filename.replace(/\.[^.]+$/, '')}-${Date.now()}`;

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'raw', public_id: publicId, format: 'pdf' },
        (err, result?: UploadApiResponse) => {
          if (err || !result) {
            reject(err || new Error('Cloudinary upload failed.'));
            return;
          }
          resolve({ url: result.secure_url, public_id: result.public_id });
        }
      );
      Readable.from(buffer).pipe(uploadStream);
    });
  },

  /**
   * Delete a file from Cloudinary by public_id (raw resource type).
   */
  async remove(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
    } catch (err) {
      // Non-fatal — log and continue
      console.error('[cloudinary] delete failed:', err);
    }
  },
};

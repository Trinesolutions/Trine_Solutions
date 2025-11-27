// Cloudinary configuration and upload utilities
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

/**
 * Uploads a file to Cloudinary through the backend
 * @param {File} file - The file to upload
 * @param {string} folder - The folder to upload to (optional)
 * @returns {Promise<Object>} - The upload response data
 */
export const uploadToCloudinary = async (file, folder = 'partners') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${BACKEND_URL}/api/admin/upload-image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // Handle 404 errors (endpoint not available on Render)
      if (response.status === 404) {
        throw new Error('Image upload functionality not available on this deployment');
      }
      throw new Error(errorData.detail || `Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      url: data.url,
      publicId: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    // If we get a network error or the endpoint doesn't exist, throw a specific error
    if (error instanceof TypeError || error.message.includes('fetch')) {
      throw new Error('Image upload functionality not available on this deployment');
    }
    throw error;
  }
};

/**
 * Uploads multiple files to Cloudinary through the backend
 * @param {File[]} files - Array of files to upload
 * @param {string} folder - The folder to upload to (optional)
 * @returns {Promise<Object[]>} - Array of upload response data
 */
export const uploadMultipleToCloudinary = async (files, folder = 'partners') => {
  return Promise.all(files.map(file => uploadToCloudinary(file, folder)));
};

export default {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
};
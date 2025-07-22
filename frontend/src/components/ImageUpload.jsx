import { useState, useRef } from 'react';
import axios from 'axios';
import { FiUpload, FiImage, FiX, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ImageUpload({ currentFolder }) {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file type
      if (!selectedFile.type.match('image.*')) {
        toast.error('Please select an image file (JPEG, PNG, etc.)');
        return;
      }
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size too large (max 5MB)');
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setUploadSuccess(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter an image name');
      return;
    }
    
    if (!file) {
      toast.error('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', file);
    if (currentFolder) formData.append('folderId', currentFolder._id);

    try {
      setIsUploading(true);
      await axios.post(`${baseUrl}/api/files/images`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setName('');
      setFile(null);
      setPreviewUrl('');
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setUploadSuccess(true);
      toast.success('Image uploaded successfully!');
      
      // Reset success state after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Upload Image</h2>
        {currentFolder && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {currentFolder.name}
          </span>
        )}
      </div>

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label htmlFor="image-name" className="block text-sm font-medium text-gray-700 mb-1">
            Image Name
          </label>
          <input
            id="image-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a descriptive name"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            disabled={isUploading}
          />
        </div>

        {previewUrl ? (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Preview</label>
            <div className="relative group">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-contain rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={removeFile}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
              >
                <FiX className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center ${isUploading ? 'border-gray-200' : 'border-gray-300 hover:border-blue-400 cursor-pointer'}`}
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <FiUpload className="h-12 w-12 text-gray-400" />
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              disabled={isUploading}
            />
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isUploading || !file || !name.trim()}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${uploadSuccess ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${(isUploading || !file || !name.trim()) && !uploadSuccess ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : uploadSuccess ? (
              <>
                <FiCheckCircle className="mr-2" />
                Upload Successful!
              </>
            ) : (
              <>
                <FiUpload className="mr-2" />
                Upload Image
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ImageUpload;
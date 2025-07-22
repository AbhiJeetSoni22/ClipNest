import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch, FiX, FiImage, FiDownload, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

function ImageSearch() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${baseUrl}/api/files/images`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log(res.data)
        setImages(res.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        toast.error('Failed to load images');
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleSearch = async (e) => {
    e?.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.get(`${baseUrl}/api/files/images/search?query=${query}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setImages(res.data);
      if (res.data.length === 0) {
        toast('No images found matching your search', { icon: '🔍' });
      }
    } catch (error) {
      console.error('Error searching images:', error);
      toast.error('Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    handleSearch();
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      await axios.delete(`${baseUrl}/api/files/images/${imageId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setImages(images.filter(img => img._id !== imageId));
      setSelectedImage(null);
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  const handleDownload = (imageUrl, imageName) => {
    const link = document.createElement('a');
    link.href = `${baseUrl}/${imageUrl}`;
    link.download = imageName || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Search Images</h2>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by image name..."
            className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {query && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-16 pr-3 flex items-center"
            >
              <FiX className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            </button>
          )}
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <FiImage className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {query ? 'No images found' : 'No images available'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {query ? 'Try a different search term' : 'Upload some images to get started'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image._id}
              className="relative group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
            >
              <div
                className="cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={`${baseUrl}/${image.path}`}
                  alt={image.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{image.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(image.path, image.name);
                  }}
                  className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                  title="Download"
                >
                  <FiDownload className="h-4 w-4 text-blue-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(image._id);
                  }}
                  className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                  title="Delete"
                >
                  <FiTrash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-medium">{selectedImage.name}</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <img
                src={`${baseUrl}/${selectedImage.path}`}
                alt={selectedImage.name}
                className="max-w-full max-h-[70vh] mx-auto"
              />
            </div>
            <div className="border-t p-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Uploaded: {new Date(selectedImage.createdAt).toLocaleString()}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownload(selectedImage.path, selectedImage.name)}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <FiDownload className="mr-2" />
                  Download
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this image?')) {
                      handleDeleteImage(selectedImage._id);
                    }
                  }}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <FiTrash2 className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageSearch;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiFolder, FiPlus, FiTrash2, FiEdit2, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function FolderList({ setCurrentFolder }) {
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState('');
  const [editingFolder, setEditingFolder] = useState(null);
  const [editFolderName, setEditFolderName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const navigate = useNavigate();
  const token = localStorage.getItem('token');

 
 const fetchFolders = async () => {
      try {
        setIsLoading(true);
        
        const res = await axios.get(`${baseUrl}/api/files/folders`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        
        setFolders(res.data);
      } catch (error) {
        console.error('Error fetching folders:', error);
        toast.error('Failed to load folders');
      } finally {
        setIsLoading(false);
      }
    };
  useEffect(() => {
     const handleAuth =async ()=>{
  try {
        const res = await axios.post(
      `${baseUrl}/api/auth/getme`,
      {}, // empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(res.status !== 200) {
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('token');
      navigate('/');
      return;
    }
  } catch (error) {
    console.log('Error fetching user data:', error);
  }
  }

   
    fetchFolders();
    handleAuth();
  }, []);

  const handleCreateFolder = async () => {
    if (!newFolder.trim()) {
      toast.error('Folder name cannot be empty');
      return;
    }

    try {
      const res = await axios.post(
        `${baseUrl}/api/files/folders`,
        { name: newFolder },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setFolders([...folders, res.data]);
      setNewFolder('');
      toast.success('Folder created successfully');
    } catch (error) {
      console.error('Error creating folder:', error);
      toast.error(error.response?.data?.message || 'Failed to create folder');
    }
  };

  const handleUpdateFolder = async (folderId) => {
    if (!editFolderName.trim()) {
      toast.error('Folder name cannot be empty');
      return;
    }

    try {
      const res = await axios.put(
        `${baseUrl}/api/files/folders/${folderId}`,
        { name: editFolderName },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setFolders(folders.map(f => f._id === folderId ? res.data : f));
      setEditingFolder(null);
      toast.success('Folder renamed successfully');
    } catch (error) {
      console.error('Error updating folder:', error);
      toast.error(error.response?.data?.message || 'Failed to update folder');
    }
  };

  const handleDeleteFolder = async (folderId) => {
 

    try {
     const res= await axios.delete(
        `${baseUrl}/api/files/folders/${folderId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchFolders();
  
      toast.success('Folder deleted successfully');
    } catch (error) {
      console.error('Error deleting folder:', error);
      toast.error(error.response?.data?.message || 'Failed to delete folder');
    }
  };

  return (
    <div className="p-6">
     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
  <h2 className="text-xl font-semibold text-gray-800">My Folders</h2>

  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
    <input
      type="text"
      value={newFolder}
      onChange={(e) => setNewFolder(e.target.value)}
      placeholder="New folder name"
      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
      onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
    />
    <button
      onClick={handleCreateFolder}
      className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
    >
      <FiPlus className="mr-2" />
      Create
    </button>
  </div>
</div>


      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : folders.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <FiFolder className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No folders yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new folder</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <div
              key={folder._id}
              className="relative group bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              {editingFolder === folder._id ? (
                <div className="flex flex-col space-y-2">
                  <input
                    type="text"
                    value={editFolderName}
                    onChange={(e) => setEditFolderName(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                    onKeyPress={(e) => e.key === 'Enter' && handleUpdateFolder(folder._id)}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateFolder(folder._id)}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingFolder(null);
                        setEditFolderName('');
                      }}
                      className="text-xs bg-gray-200 px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    onClick={() => setCurrentFolder(folder)}
                    className="flex items-center cursor-pointer"
                  >
                    <FiFolder className="h-6 w-6 text-blue-500 mr-3" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{folder.name}</h3>
                      <p className="text-xs text-gray-500">
                        {folder.numberOfFiles || 0} {folder.numberOfFiles === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                    <FiChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingFolder(folder._id);
                        setEditFolderName(folder.name);
                      }}
                      className="p-1 text-gray-500 hover:text-blue-500"
                      title="Rename"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFolder(folder._id);
                      }}
                      className="p-1 text-gray-500 hover:text-red-500"
                      title="Delete"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FolderList;
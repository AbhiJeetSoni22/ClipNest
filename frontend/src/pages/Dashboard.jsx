import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import FolderList from '../components/FolderList.jsx';
import ImageUpload from '../components/ImageUpload.jsx';
import ImageSearch from '../components/ImageSearch.jsx';
import { FiUpload, FiSearch, FiFolder, FiHome } from 'react-icons/fi';

function Dashboard() {
  const [currentFolder, setCurrentFolder] = useState(null);
  const [activeTab, setActiveTab] = useState('folders');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`bg-white hidden md:block shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              {sidebarOpen ? (
                <h2 className="text-xl font-bold text-gray-800">File Manager</h2>
              ) : (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiFolder className="text-blue-600" />
                </div>
              )}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                {sidebarOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>

            <nav className="flex-1">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('home')}
                    className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <FiHome className="text-lg" />
                    {sidebarOpen && <span className="ml-3">Home</span>}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('folders')}
                    className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'folders' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <FiFolder className="text-lg" />
                    {sidebarOpen && <span className="ml-3">My Folders</span>}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'upload' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <FiUpload className="text-lg" />
                    {sidebarOpen && <span className="ml-3">Upload</span>}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('search')}
                    className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'search' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
             
                  </button>
                </li>
              </ul>
            </nav>

            {sidebarOpen && (
              <div className="mt-auto p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800">Storage</h3>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="mt-1 text-xs text-gray-500">4.5 GB of 10 GB used</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {activeTab === 'home' && 'Home'}
                {activeTab === 'folders' && 'My Folders'}
                {activeTab === 'upload' && 'Upload Images'}
               
              </h1>
              
              {currentFolder && activeTab === 'folders' && (
                <div className="flex items-center text-sm text-gray-500">
                  <span>Current Folder:</span>
                  <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {currentFolder.name}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              {activeTab === 'folders' && (
                <FolderList setCurrentFolder={setCurrentFolder} />
              )}
              {activeTab === 'upload' && (
                <ImageUpload currentFolder={currentFolder} />
              )}
              {activeTab === 'home' && (
                <ImageSearch />
              )}
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
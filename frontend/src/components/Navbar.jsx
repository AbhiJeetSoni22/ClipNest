import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8z" />
              </svg>
              <h1 className="ml-2 text-white text-2xl font-bold hidden sm:block">ClipNest</h1>
            </div>
            
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => navigate('/folders')}
                  className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  My Folders
                </button>
                <button 
                  onClick={() => navigate('/upload')}
                  className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop user and logout */}
          <div className="hidden md:block ml-4">
            <div className="relative">
              <button
                onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}
                className="flex items-center text-sm rounded-full text-white focus:outline-none"
              >
                <span className="mr-2">Account</span>
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>

              {showLogoutConfirm && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm text-gray-700">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {localStorage.getItem('email') || 'User'}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => {
                navigate('/dashboard');
                setIsMenuOpen(false);
              }}
              className="text-blue-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                navigate('/folders');
                setIsMenuOpen(false);
              }}
              className="text-blue-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              My Folders
            </button>
            <button
              onClick={() => {
                navigate('/upload');
                setIsMenuOpen(false);
              }}
              className="text-blue-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Upload
            </button>
          </div>
          <div className="pt-4 pb-3 border-t border-blue-800">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">
                  {localStorage.getItem('email') || 'User'}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-200 hover:text-white hover:bg-blue-600"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
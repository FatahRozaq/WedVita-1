// Sidebar.js
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import wedvitaBlk from './assets/wedvita_blk1.svg'
import wedvitaWhite from './assets/wedvita_white.svg'
import imag1 from './assets/Imag1.svg'
import imag2 from './assets/Imag2.svg'
import sosmed from './assets/sosmeds.svg'
import Carousel from './Carousel';
import Carousel2 from './Carousel2';
import orang1 from './assets/Ellipse 10.png'
import orang2 from './assets/Ellipse 11.png'
import orang3 from './assets/Ellipse 12.png'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  

    
    return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Transition
        show={isOpen}
        enter="transform transition duration-300 ease-in-out"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition duration-300 ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {(ref) => (
          <div ref={ref} className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            {/* Sidebar content */}
            <div className="p-4">
              {/* Your sidebar content here */}
              <p>Sidebar Content</p>
            </div>
          </div>
        )}
      </Transition>

      {/* Main content */}
      <div className="flex-1 overflow-auto focus:outline-none">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-wedvita-purple"
            onClick={toggleSidebar}
          >
            {/* Sidebar toggle button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
    </div>
    );
};

export default Sidebar;

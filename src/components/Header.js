"use client"

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import CreateEventModal from './CreateEventModal';
// If logo.png is in the `public` folder, you can remove the import line.
// import logo from 'logo.png';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="flex items-center justify-between bg-black text-white p-4">
      {/* Logo and Title */}
      <div className="flex items-center space-x-2 text-lg font-bold ">
        {/* Update the src path if the logo is in the public folder */}
        <img src="/logo.png" alt="Atithi" className="w-10" />
        <span className="text-[#d4af37] text-xl font-semibold tracking-wider">
          ATITHI AGMAN
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-4">
        {/* Create Event Button */}
        <button 
          onClick={openModal} 
          className="text-[#d4af37] font-medium text-sm px-4 py-1.5 rounded  transition">
          Create Event
        </button>
        
        {/* Ongoing Events Button */}
        <button 
          className="bg-[#d4af37] text-black font-medium text-sm px-4 py-1.5 rounded-full">
          Ongoing Events
        </button>

        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            className="bg-white text-black pl-10 pr-4 py-2 rounded-full focus:outline-none text-sm"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </nav>

      {/* Modal for Creating Event */}
      {isModalOpen && <CreateEventModal closeModal={closeModal} />}
    </header>
  );
};

export default Header;

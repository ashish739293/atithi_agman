"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import CreateEventModal from './CreateEventModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const isHomePage = router.pathname !== '/';
  console.log("+++++++++++++++==")
  console.log(isHomePage);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="flex items-center justify-between bg-black text-white p-4">
      {/* Logo and Title */}
      <div className="flex items-center space-x-2 text-lg font-bold">
        <img src="/logo.png" alt="Atithi" className="w-10" />
        <span className="text-[#d4af37] text-xl font-semibold tracking-wider">
          ATITHI AGMAN
        </span>
      </div>

      {/* Center Navigation Links */}
      {isHomePage && (
        <div className="flex flex-grow justify-center space-x-6">
          <a href="#what-we-offer" className="text-white text-sm font-medium hover:text-[#d4af37] transition">What We Offer</a>
          <a href="#event" className="text-white text-sm font-medium hover:text-[#d4af37] transition">Event</a>
          <a href="#contact-us" className="text-white text-sm font-medium hover:text-[#d4af37] transition">Contact Us</a>
        </div>
      )}

      {/* Login/Signup Button */}
      {isHomePage && (
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2 bg-[#d4af37] text-black font-medium text-sm rounded-full">
            <button 
              onClick={() => router.push('/login')} 
              className="px-4 py-1.5 rounded-l-full">
              Login
            </button>
            <button 
              onClick={() => router.push('/signup')} 
              className="px-4 py-1.5 rounded-r-full">
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Conditional Rendering Based on Route */}
      {!isHomePage && (
        <nav className="flex items-center space-x-4">
          <button 
            onClick={openModal} 
            className="text-[#d4af37] font-medium text-sm px-4 py-1.5 rounded transition">
            Create Event
          </button>
          <button className="bg-[#d4af37] text-black font-medium text-sm px-4 py-1.5 rounded-full">
            Ongoing Events
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="bg-white text-black pl-10 pr-4 py-2 rounded-full focus:outline-none text-sm"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </nav>
      )}

      {/* Modal for Creating Event */}
      {isModalOpen && <CreateEventModal closeModal={closeModal} />}
    </header>
  );
};

export default Header;

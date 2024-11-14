"use client"

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import CreateEventModal from './CreateEventModal';
import Cookies from 'js-cookie';
import { useSearch } from '@/utils/SearchContext';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [type, setType] = useState(null);
  const { setSearchTerm } = useSearch();
  const isHomePage = pathname === '/';

  useEffect(() => {
    // Only runs on the client
    setType(Cookies.get('type'));
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Logout function
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('mobile');
    Cookies.remove('name');
    Cookies.remove('type');
    Cookies.remove('user_id');
    setType(null);
    router.push('/'); // Redirect to homepage after logout to refresh the header
 
  };

   const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
   }
  if (type === null && !isHomePage) {
    // Optional loading state or redirect logic if needed
    return null;
  }

  return (
    <header className="flex items-center justify-between bg-black text-white p-4 relative">
      {/* Logo and Title */}
      <div className="flex items-center space-x-2 text-lg font-bold">
        <img src="/logo.png" alt="Atithi" className="w-10" />
        <span className="text-[#d4af37] text-xl font-semibold tracking-wider">
          ATITHI AGMAN
        </span>
      </div>

      {/* Center Navigation Links (Desktop Only) */}
      {isHomePage && (
        <div className="hidden lg:flex flex-grow justify-center space-x-6">
          <a href="#what-we-offer" className="text-white text-sm font-medium hover:text-[#d4af37] transition">
            What We Offer
          </a>
          <a href="#event" className="text-white text-sm font-medium hover:text-[#d4af37] transition">
            Event
          </a>
          <a href="#contact-us" className="text-white text-sm font-medium hover:text-[#d4af37] transition">
            Contact Us
          </a>
        </div>
      )}

      {/* Login/Signup Button (Desktop Only) */}
      {isHomePage && !type && (
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex bg-[#d4af37] text-black font-medium text-sm rounded-md">
            <button onClick={() => router.push('/login')} className="pl-4 pb-1 pt-1 rounded-l-full">
              Login
            </button>
            <span className="pt-1">/</span>
            <button onClick={() => router.push('/register')} className="pr-4 pb-1 pt-1 rounded-r-full">
              Signup
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button className="lg:hidden p-2" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6 text-white" /> : <Bars3Icon className="h-6 w-6 text-white" />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white p-4 lg:hidden z-50">
          {isHomePage && (
            <div className="flex flex-col items-center space-y-4">
              <a href="#what-we-offer" className="text-sm font-medium hover:text-[#d4af37] transition">
                What We Offer
              </a>
              <a href="#event" className="text-sm font-medium hover:text-[#d4af37] transition">
                Event
              </a>
              <a href="#contact-us" className="text-sm font-medium hover:text-[#d4af37] transition">
                Contact Us
              </a>
            </div>
          )}

          {/* Login/Signup (Mobile Only) */}
          {isHomePage && !type && (
            <div className="flex justify-center mt-4">
              <div className="flex bg-[#d4af37] text-black font-medium text-sm rounded-md">
                <button onClick={() => router.push('/login')} className="pl-4 pb-1 pt-1 rounded-l-full">
                  Login
                </button>
                <span className="pt-1">/</span>
                <button onClick={() => router.push('/register')} className="pr-4 pb-1 pt-1 rounded-r-full">
                  Signup
                </button>
              </div>
            </div>
          )}

          {/* Buttons for Admin and User */}
          {(type === "User" || type === "Admin") && (
            <div className="flex flex-col items-center space-y-4 mt-4">
              {type === "User" && (
                <button onClick={openModal} className="text-[#d4af37] font-medium text-sm px-4 py-2 rounded transition">
                  Create Event
                </button>
              )}
              <button className="bg-[#d4af37] text-black font-medium text-sm px-4 py-2 rounded-full">
                {type === "User" ? "Ongoing Events" : "Admin Dashboard"}
              </button>
              <button onClick={handleLogout} className="text-red-500 font-medium text-sm px-4 py-2 rounded transition">
                Logout
              </button>
              <div className="relative w-full max-w-[200px] mt-2">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="bg-white text-black pl-10 pr-4 py-2 rounded-full focus:outline-none text-sm w-full"
                  
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Desktop Buttons for User and Admin */}
      {(type === "User" || type === "Admin") && (
        <nav className="hidden lg:flex items-center space-x-2 md:space-x-4">
          {type === "User" && (
            <button onClick={openModal} className="text-[#d4af37] font-medium text-sm px-3 md:px-4 py-1.5 rounded transition">
              Create Event
            </button>
          )}
          <button className="bg-[#d4af37] text-black font-medium text-sm px-3 md:px-4 py-1.5 rounded-full">
            {type === "User" ? "Ongoing Events" : "Admin Dashboard"}
          </button>
          <button onClick={handleLogout} className="text-red-500 font-medium text-sm px-3 md:px-4 py-1.5 rounded transition">
            Logout
          </button>
          <div className="relative hidden md:block w-full max-w-[200px]">
            <input
              type="text"
              placeholder="Search here..."
              className="bg-white text-black pl-10 pr-4 py-2 rounded-full focus:outline-none text-sm w-full"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </nav>
      )}

      {isModalOpen && <CreateEventModal closeModal={closeModal} />}
    </header>
  );
};

export default Header;

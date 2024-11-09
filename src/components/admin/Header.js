"use client"

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Header = () => {

    return (
        <header className="flex items-center justify-between bg-black text-white p-4">
            <div className="flex items-center space-x-2 text-lg font-bold ">
                <img src="/logo.png" alt="Atithi" className="w-10" />
                <span className="text-[#d4af37] text-xl font-semibold tracking-wider">
                    ATITHI AGMAN
                </span>
            </div>

            <nav className="flex items-center space-x-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="bg-white text-black pl-10 pr-4 py-2 rounded-full focus:outline-none text-sm"
                    />
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
            </nav>
        </header>
    );
};

export default Header;

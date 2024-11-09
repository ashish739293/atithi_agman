"use client"
import React, { useState } from 'react';

const CreateEventModal = ({ closeModal }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 text-black rounded-lg shadow-lg w-[500px] max-w-full">
        <h2 className="text-black text-xl font-bold mb-4">Create Event</h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Event Title"
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:border-[#d4af37]"
            />
            <input
              type="date"
              placeholder="select Date"
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Guest List</label>
            <div className=" border border-gray-300 rounded-full p-3 focus:outline-none focus:border-[#d4af37]">
                <span>upload Excel file</span>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="px-4 py-2 bg-[#d4af37] text-white rounded-full cursor-pointer"
              >
                Select File
              </label>
            </div>
            <span> <a href="#" className="underline">Download Sample Excel</a></span>

            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {file.name}
              </p>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-[#d4af37] text-white rounded-full hover:bg-[#bfa22d]"
            >
              Submit and Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;

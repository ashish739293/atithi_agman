"use client";
import React, { useState } from 'react';

const CreateEventModal = ({ closeModal }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let formErrors = {};
    if (!title) formErrors.title = "Event title is required";
    if (!username) formErrors.username = "Username is required";
    if (!date) formErrors.date = "Date is required";
    if (!file) formErrors.file = "Guest list file is required";
    return formErrors;
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setErrors((prevErrors) => ({ ...prevErrors, file: null })); // Clear file error
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors((prevErrors) => ({ ...prevErrors, title: null })); // Clear title error
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: null })); // Clear username error
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    if (errors.date) {
      setErrors((prevErrors) => ({ ...prevErrors, date: null })); // Clear date error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('username', username);
      formData.append('date', date);
      formData.append('file', file);
      const authToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYXNoaXNoMTIzIiwibW9iaWxlIjoiNzM5MjkzMjMwNSIsImlhdCI6MTczMTE3NDc4NCwiZXhwIjoxNzMxMjYxMTg0fQ.9figCGHzAOGe70KLEAMYaIozsFJYtT1i5kf3HU3_nAs";
      try {
        const response = await fetch('/api/createEvent', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`, // Include the auth token here
          },
        });

        if (response.ok) {
          console.log("Event created successfully");
          closeModal();
        } else {
          const errorData = await response.json();
          console.error("Error creating event:", errorData.message);
        }
      } catch (error) {
        console.error("Error creating event:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 text-sm text-black rounded-lg shadow-lg w-[500px] max-w-full">
        <h2 className="text-black text-xl font-bold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Event Title"
              value={title}
              onChange={handleTitleChange}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:border-[#d4af37]"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:border-[#d4af37]"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:border-[#d4af37]"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Guest List</label>
            <div className="flex items-center space-x-2">
              <div className="border text-sm border-gray-300 rounded-full p-2 focus:outline-none focus:border-[#d4af37] flex items-center space-x-2">
                <span>Upload Excel file</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="px-6 py-2 bg-[#d4af37] text-white rounded-full cursor-pointer"
                >
                  Select File
                </label>
              </div>
              <span>
                <a href="#" className="underline text-sm">
                  Download Sample Excel
                </a>
              </span>
            </div>
            {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
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
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Submit and Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;

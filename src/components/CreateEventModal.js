"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const authToken = Cookies.get('token');

const CreateEventModal = ({ closeModal, event = null, closeEdit, fetchEvents }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Prefill form fields if event data is provided (edit mode)
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setUsername(event.username);
      setDate(event.date);
      // If the event already has a file, you can handle it in some way, or keep it as null
      setFile(null); // This can be replaced with logic if you want to show the existing file.
    }
  }, [event]);

  const validateForm = () => {
    let formErrors = {};
    if (!title) formErrors.title = "Event title is required";
    if (!username) formErrors.username = "Username is required";
    if (!date) formErrors.date = "Date is required";
    if (!file && !event?.file) formErrors.file = "Guest list file is required";
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
      if (file) formData.append('file', file);
      if (event?.id) {
        formData.append('eventId', event.id);
      }

      // try {
        const url = event ? '/api/updateEvent' : '/api/createEvent'; // Dynamic URL based on action
        const method = event ? 'PUT' : 'POST'; // 'PUT' for editing, 'POST' for creating

        const response = await fetch(url, {
          method,
          body: formData,
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          console.log(`${event ? 'Event updated' : 'Event created'} successfully`);
          fetchEvents();
          if (event) {
            closeEdit()
          } else {
            closeModal()
          }

        } else {
          const errorData = await response.json();
          console.error(`${event ? 'Error updating event' : 'Error creating event'}:`, errorData.message);
        }
      // } catch (error) {
      //   console.error(`${event ? 'Error updating event' : 'Error creating event'}:`, error);
      // } finally {
      //   setIsLoading(false);
      // }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 text-sm text-black rounded-lg shadow-lg w-[500px] max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black text-xl font-bold">{event ? 'Edit Event' : 'Create Event'}</h2>
          <button
            type="button"
            onClick={event ? closeEdit : closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
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
              {isLoading ? "Saving..." : event ? "Update Event" : "Submit and Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;


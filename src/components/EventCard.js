"use client"
import { useState, useEffect, useRef } from 'react';
import { CalendarIcon, LinkIcon, UserIcon, ShareIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import CreateEventModal from './CreateEventModal';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const authToken = Cookies.get('token');

const EventCard = ({ event, fetchEvents, admin = '' }) => {
  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [tableData, setTableData] = useState([]);
  const initialLoadRef = useRef(true);  // Track initial load
  // Sample data for table rows
  const tableDatas = [
    { srNo: 1, name: "John Doe", mobile: "+91123456789", sent: 5, received: 3 },
    { srNo: 2, name: "Jane Smith", mobile: "+91123456788", sent: 7, received: 6 },
    { srNo: 3, name: "Alex Brown", mobile: "+91123456787", sent: 4, received: 4 },
    // Add more sample rows as needed
  ];

  // Filter table rows based on search term
  const filteredData = tableData.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.mobile.includes(searchTerm)
  );

  // Toggle table visibility 
  const toggleTable = () => {
    setShowTable(prevState => !prevState);
  };

  const fetchTableData = async () => {
    try {
      const response = await fetch(`/api/getGuestList?event_id=${event.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTableData(data.data); // Assuming events are in `data.data`
      } else {
        const errorData = await response.json();
        console.log("Error fetching events:", errorData.message);
      }
    } catch (error) {
      console.log("Fetch events failed:", error);
    }
  };

  useEffect(() => {
    if (showTable && event?.id && !initialLoadRef.current) {
      fetchTableData();  // Fetch table data using event.id
    }
    // Set the ref to false after the first render
    initialLoadRef.current = false;
  }, [showTable, event]);

  const handleEdit = () => {
    setShowEditModal(prevState => !prevState);
  };

  const closeEdit = () => {
    setShowEditModal(false);
  };

  const handleDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const formData = new FormData();
          formData.append('eventId', event.id);

          const url = `/api/deleteEvent?eventId=${event.id}`;
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
          });

          const result = await response.json();

          if (response.ok) {
            // Show success message
            Swal.fire('Deleted!', result.message, 'success');
            fetchEvents();
          } else {
            Swal.fire('Failed!', result.message, 'error');
          }
        } catch (error) {
          Swal.fire('Failed!', 'Something went wrong. Please try again.', 'error');
        }
      }
    });
  };

  const parsedDate = new Date(Date.parse(event.date)); // Parse the date string
  const formattedDate = parsedDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(event.link);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 3000); // Hide message after 3 seconds
    } catch (err) {
      console.log("Failed to copy link: ", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mx-auto mt-8 border border-gray-200 flex flex-col max-w-full">
      {/* Event Card */}
      <div className="flex items-center justify-between flex-wrap sm:flex-nowrap" onClick={toggleTable}>
        <div className="flex items-start space-x-4 w-full sm:w-auto">
          <div className="flex flex-col space-y-1 w-full sm:w-auto">
            <div className="flex items-center space-x-2">
              <UserIcon className="w-5 h-5 text-gray-800" />
              <span className="text-xl font-semibold text-gray-800 truncate">{event.title}</span>
            </div>
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-blue-500 flex items-center truncate"
            >
              <LinkIcon className="w-4 h-4 mr-1" />
              {event.link}
            </a>
            <div className="flex space-x-2 mt-2">
              {event.total_send > 0 && (
                <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Total Sent: {event.total_send}
                </span>
              )}
              {event.total_send > 0 && (
                <span className="bg-[#d4af37] text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Total Received: {event.total_receive}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2 w-full sm:w-auto">
          <div className="flex items-center text-gray-500 space-x-1">
            <CalendarIcon className="w-5 h-5" />
            <span className="text-sm">{formattedDate}</span>
          </div>

          <div className="relative">
            <button
              className="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 text-sm font-semibold space-x-1"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event from bubbling up to the parent
                handleCopyLink();
              }}
            >
              <ShareIcon className="w-4 h-4" />
              <span>Share</span>
            </button>

            {showCopied && (
              <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg transition-transform duration-500 ease-in-out opacity-0 animate-fade-out">
                <span className="text-sm">Link Copied!</span>
              </div>
            )}

            {/* Animation for fade out */}
            <style jsx>{`
              @keyframes fade-out {
                0% {
                  opacity: 1;
                  transform: translateY(0);
                }
                80% {
                  opacity: 1;
                  transform: translateY(0);
                }
                100% {
                  opacity: 0;
                  transform: translateY(-10px);
                }
              }
  
              .animate-fade-out {
                animation: fade-out 2.5s forwards;
              }
            `}</style>
          </div>

          <div className="flex space-x-4">
            {admin == 'admin' && (
              <p>
                Created by: <span className="font-medium">{event.username}</span>
              </p>
            )}

            <button
              className="text-red-600 font-semibold text-sm hover:text-red-700 flex items-center space-x-1"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event from bubbling up to the parent
                handleEdit();
              }}
            >
              <PencilIcon className="w-4 h-4 text-gray-800" />
              <span>Edit</span>
            </button>
            <button
              className="text-red-600 font-semibold text-sm hover:text-red-700 flex items-center space-x-1"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event from bubbling up to the parent
                handleDelete();
              }}
            >
              <TrashIcon className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table and Search Bar */}
      {showTable && (
        <div className="mt-4">
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg"
              placeholder="Search by name or mobile"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-[#FF55551A] text-gray-600">
                  <th className="px-4 py-2 font-semibold">Sr No.</th>
                  <th className="px-4 py-2 font-semibold">Name</th>
                  <th className="px-4 py-2 font-semibold">Mobile</th>
                  <th className="px-4 py-2 font-semibold">Sent</th>
                  <th className="px-4 py-2 font-semibold">Received</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={row.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 text-center">
                      <td className="px-4 py-2 text-gray-700">{row.id}</td>
                      <td className="px-4 py-2 text-gray-700">{row.name}</td>
                      <td className="px-4 py-2 text-gray-700">{row.mobile}</td>
                      <td className="px-4 py-2 text-gray-700">{row.send}</td>
                      <td className="px-4 py-2 text-gray-700">{row.receive}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-4">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {showEditModal && <CreateEventModal event={event} closeModal={closeEdit} fetchEvents={fetchEvents} />}
    </div>
  );

};

export default EventCard;

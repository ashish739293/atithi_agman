'use client';
import React, { useEffect, useState } from "react";
import { FiCalendar, FiShare2, FiExternalLink } from "react-icons/fi";
import Cookies from 'js-cookie';
import CreateEventModal from "../CreateEventModal";
import Swal from 'sweetalert2';

const authToken = Cookies.get('token');

const EventList = ({ event, fetchEvents }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCopied, setShowCopied] = useState(false);

    const handleEdit = () => {
        setShowEditModal(!showEditModal);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(event.link);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 3000);
        } catch (err) {
            console.log("Failed to copy link: ", err);
        }
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

    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-4 mb-4 rounded-lg shadow border border-gray-300 bg-white">
            <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                    <span className="text-lg">🎉</span>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                </div>
                <a
                    href={`https://${event.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 flex items-center space-x-1"
                >
                    <span>{event.link}</span>
                    <FiExternalLink className="text-gray-500" size={12} />
                </a>
            </div>

            <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center text-gray-500 space-x-1">
                    <FiCalendar className="text-gray-500" size={16} />
                    <span className="text-sm">{event.date}</span>
                </div>

                <button className="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 text-sm font-semibold space-x-1" onClick={handleCopyLink}>
                    <FiShare2 size={14} />
                    <span>Share</span>
                </button>
                {showCopied && (
                    <div
                        className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 ease-in-out"
                        style={{ animation: "fadeOut 3s forwards" }}
                    >
                        Link Copied!
                    </div>
                )}

                <div className="flex space-x-4">
                    <p>
                        Created by: <span className="font-medium">{event.username}</span>
                    </p>
                    <button
                        className="text-red-600 font-semibold text-sm hover:text-red-700 flex items-center space-x-1"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit();
                        }}
                    >
                        <span>Edit</span>
                    </button>
                    <button
                        className="text-red-600 font-semibold text-sm hover:text-red-700 flex items-center space-x-1"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                    >
                        <span>Delete</span>
                    </button>
                </div>
            </div>

            {showEditModal && (
                <CreateEventModal event={event} closeEdit={handleEdit} fetchEvents={fetchEvents} />
            )}
        </div>
    );
};

const UserEventList = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/getEvents', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setEvents(data.data);
            } else {
                const errorData = await response.json();
                console.error("Error fetching events:", errorData.message);
            }
        } catch (error) {
            console.error("Fetch events failed:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [authToken]);

    return (
        <div className="p-4">
            {events.length > 0 ? (
                events.map((event) => (
                    <EventList key={event.id} event={event} fetchEvents={fetchEvents} />
                ))
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
};

export default UserEventList;
import React from "react";
import { FiCalendar, FiShare2, FiExternalLink } from "react-icons/fi";

const EventList = ({ title, link, date, creator }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-4 mb-4 rounded-lg shadow border border-gray-300 bg-white">
            <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                    <span className="text-lg">🎉</span>
                    <h3 className="font-semibold text-lg">{title}</h3>
                </div>
                <a
                    href={`https://${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 flex items-center space-x-1"
                >
                    <span>{link}</span>
                    <FiExternalLink className="text-gray-500" size={12} />
                </a>
            </div>

            <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center text-gray-500 space-x-1">
                    <FiCalendar className="text-gray-500" size={16} />
                    <span className="text-sm">{date}</span>
                </div>

                <button className="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 text-sm font-semibold space-x-1">
                    <FiShare2 size={14} />
                    <span>Share</span>
                </button>

                <div className="flex space-x-4">
                    <p>
                        Created by: <span className="font-medium">{creator}</span>
                    </p>
                    <button className="text-red-600 font-semibold text-sm hover:text-red-700 flex items-center space-x-1">
                        <span>Edit</span>
                    </button>
                    <button className="text-red-600 font-semibold text-sm hover:text-red-700 flex items-center space-x-1">
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const UserEventList = () => {
    const events = [
        {
            title: "John's Wedding",
            link: "johnswedding.atthiagman.com",
            date: "11/November/2024",
            creator: "John Doe",
        },
        {
            title: "John's Wedding",
            link: "johnswedding.atthiagman.com",
            date: "11/November/2024",
            creator: "John Doe",
        },
    ];

    return (
        <div className="p-4">
            {events.map((event, index) => (
                <EventList key={index} {...event} />
            ))}
        </div>
    );
};

export default UserEventList;

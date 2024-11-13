"use client";
import React, { useState } from "react";
import CreateEventModal from "../CreateEventModal";
import { useMediaQuery } from 'react-responsive';

const EventsTab = () => {
    const [activeTab, setActiveTab] = useState("Ongoing Events");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const tabClasses = (tab) =>
        `px-4 py-2 rounded-full font-semibold ${activeTab === tab ? "bg-black text-[#deab55]" : "bg-[#deab55] text-black"
        } transition-colors duration-200 ease-in-out hover:opacity-90`;

    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

    return (
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'space-x-10'} p-4 bg-white`}>
            <button
                onClick={openModal}
                className={tabClasses("Create Event")}
            >
                Create Event
            </button>
            <button
                onClick={() => setActiveTab("Ongoing Events")}
                className={tabClasses("Ongoing Events")}
            >
                Ongoing Events
            </button>
            <button
                onClick={() => setActiveTab("Completed Events")}
                className={tabClasses("Completed Events")}
            >
                Completed Events
            </button>
            {isModalOpen && <CreateEventModal closeModal={closeModal} />}
        </div>
    );
};

export default EventsTab;

'use client';
import React from 'react';
import EventsTab from '@/components/admin/Threetab';
import UserEventList from '@/components/admin/UserEventList';
import { useState } from "react";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("Ongoing Events");
    return (
        <>
            <EventsTab onTabChange={setActiveTab} />
            <UserEventList activeTab={activeTab} />
        </>
    );
}
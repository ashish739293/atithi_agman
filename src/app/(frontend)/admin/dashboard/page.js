
import React from 'react';
import EventsTab from '@/components/admin/Threetab';
import UserEventList from '@/components/admin/UserEventList';

export default function AdminDashboard() {
    return (
        <>
            <EventsTab/>
            <UserEventList/>
        </>
    );
}
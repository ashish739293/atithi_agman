
import React from 'react';
import Header from '@/components/admin/Header';
import EventsTab from '@/components/admin/Threetab';
import UserEventList from '@/components/admin/UserEventList';

export default function AdminDashboard() {
    return (
        <>
            <Header/>
            <EventsTab/>
            <UserEventList/>
        </>
    );
}
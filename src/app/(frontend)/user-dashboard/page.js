"use client"
import EventCard from '../../../components/EventCard';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const authToken = Cookies.get('token');


export default function Home() {

  const [events, setEvents] = useState([]);


  // Function to fetch events
  const fetchEvents = async () => {
    try {
      // const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

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
        console.log("Error fetching events:", errorData.message);
      }
    } catch (error) {
      console.log("Fetch events failed:", error);
    }
  };


  useEffect(() => {
    fetchEvents();
  }, [authToken]); // Empty dependency array ensures this runs only once on component mount


  return (
    <>
      <main className="p-4">
        {events.map(event => (
          <EventCard key={event.id} event={event} fetchEvents={fetchEvents} />
        ))}
      </main>
    </>
  );
}

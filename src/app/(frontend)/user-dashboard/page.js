"use client";
import EventCard from '../../../components/EventCard';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useSearch } from "@/utils/SearchContext";

const authToken = Cookies.get('token');

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useSearch();

  const fetchEvents = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/getEvents?search=${encodeURIComponent(searchTerm)}`, {
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
        // const errorData = await response.json();
        console.error("Error fetching events:", response.message);
      }
    } catch (error) {
      console.error("Fetch events failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(searchTerm);
  }, [searchTerm]);
  useEffect(() => {
    fetchEvents();

    // Add the event listener
    window.addEventListener("createEvent", fetchEvents);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("createEvent", fetchEvents);
    };
  }, [authToken]);

  return (
    <>
      <main className="p-4">
        {loading ? (
          <p className="centered-message">Loading events...</p>
        ) : events.length > 0 ? (

          events.sort((a, b) => b.id - a.id) // Sort in descending order by event.id
            .map(event => (
              <EventCard key={event.id} event={event} fetchEvents={fetchEvents} />
            ))

        ) : (
          <p className="centered-message">Event not found</p>
        )}
      </main>
      <style jsx>{`
        .centered-message {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 80vh;
          font-size: 1.5rem;
          color: #666;
        }
      `}</style>
    </>
  );
}

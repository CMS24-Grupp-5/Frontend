import React, { useEffect, useState } from 'react';
import './Event/Event.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
    fetchEvents();
  }, []);

  const fetchBookings = () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const userId = authData?.userId;

    if (!userId) {
      setError("No user is logged in.");
      return;
    }

    fetch(`https://localhost:7093/api/Booking/by-user?userId=${userId}`)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => {
        console.error("Error retrieving bookings", err);
        setError("Could not retrieve your bookings.");
      });
  };

  const fetchEvents = () => {
    fetch("https://eventprovider20250506133954.azurewebsites.net/api/Events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => {
        console.error("Error retrieving events:", err);
        setError("Could not retrieve event information.");
      });
  };

  const getEventInfo = (eventId) => events.find(e => e.id === eventId);

  const handleCancel = (bookingId) => {
    fetch(`https://localhost:7093/api/Booking/${bookingId}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error("Cancellation failed.");
        return res.text();
      })
      .then(() => {
        alert("Booking cancelled.");
        fetchBookings(); // Uppdatera listan
      })
      .catch(err => {
        console.error("Error during cancellation:", err);
        alert("Could not cancel.");
      });
  };

  return (
    <div className="event-list">
      <h1>My Events</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="events">
        {bookings.map((booking) => {
          const event = getEventInfo(booking.eventId);
          return (
            <div key={booking.bookingId} className="event-card">
              <h2 className="event-title">{event ? event.title : "Unknown event."}</h2>
              <p className="event-date"><span className="event-label">Date:</span> {event ? event.date.split("T")[0] : "?"}</p>
              <p className="event-location"><span className="event-label">Location:</span> {event ? event.location : "?"}</p>
              <p className="event-description"><span className="event-label">Booked:</span> {booking.bookingDate.split("T")[0]}</p>
              <button className="button button-primary" onClick={() => handleCancel(booking.bookingId)}>Cancel booking</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;

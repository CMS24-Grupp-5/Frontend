import React, { useEffect, useState } from 'react'
import './Event.css'
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')

  const today = new Date()
  const nextYear = new Date()
  nextYear.setFullYear(today.getFullYear() + 1)
  const formatDate = (date) => date.toISOString().split("T")[0]

  const [startDate, setStartDate] = useState(formatDate(today))
  const [endDate, setEndDate] = useState(formatDate(nextYear))

  const [sortBy, setSortBy] = useState('title')
  const [order, setOrder] = useState('asc')
  const [sort, setSort] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams()

    if (title) params.append('title', title)
    if (location) params.append('location', location)
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)

    if (sort) {
      params.append('sort', 'true')
      params.append('sortBy', sortBy)
      params.append('order', order)
    }

   fetch(`https://eventviewprovider.azurewebsites.net/api/events?${params.toString()}`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Error fetching:", err))
  }, [title, location, startDate, endDate, sort, sortBy, order])

const handleBook = (eventId) => {
  const authData = JSON.parse(localStorage.getItem("auth"));
  const userId = authData?.userId;

  if (!userId) {
    alert("No UserId found in localStorage.");
    return;
  }

  fetch("https://bookeventprovider.azurewebsites.net/api/Booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: userId,
      eventId: eventId
    })
  })
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => { throw new Error(text); });
      }
      return res.json();
    })
    .then(data => {
      console.log("Booking created:", data);
      alert("Booking successful!");
    })
    .catch(err => {
      console.error("Booking error:", err);
      alert("Booking failed.");
    });
};


  return (
    <div className="event-list">
      <h1>Upcoming Events</h1>

      <button onClick={() => navigate('/events/create')}>Create new Event</button>
      <div className="filters">
        <input type="text" placeholder="Search" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        
        <input type="date"
        placeholder="Start date" 
        value={startDate} 
        onChange={e => setStartDate(e.target.value)} 
        title="Start date"
        />
        <input type="date"
        placeholder="End date"
        value={endDate} 
        onChange={e => setEndDate(e.target.value)} 
        title="End date"
        />

        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="title">Sort by title</option>
          <option value="date">Sort by date</option>
        </select>
        <select value={order} onChange={e => setOrder(e.target.value)}>
          <option value="asc">(A-Ö / oldest first)</option>
          <option value="desc">(Ö-A / newest first)</option>
        </select>
      </div>

      <div className="events">
        {events.map((event) => (
        <div key={event.id} className="event-card">
          <h2 className="event-title">{event.title}</h2>
          <p className="event-date"><span className="event-label">Date:</span> {event.date.split('T')[0]}</p>
          <p className="event-location"><span className="event-label">Location:</span> {event.location}</p>
          <p className="event-description"><span className="event-label">Description:</span> {event.description}</p>
          <button className="button button-primary" onClick={() => handleBook(event.id)}>Book</button>
          <button className="button button-secondary" onClick={() => navigate('/events/details/' + event.id)}>Details</button>
        </div>
      ))}
      </div>
    </div>
  )
}

export default EventList

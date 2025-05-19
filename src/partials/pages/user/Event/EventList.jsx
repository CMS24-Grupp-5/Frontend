import React, { useEffect, useState } from 'react'
import './Event.css'

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
      .catch(err => console.error("Fel vid hämtning:", err))
  }, [title, location, startDate, endDate, sort, sortBy, order])

  return (
    <div className="event-list">
      <h1>Kommande evenemang</h1>
      <div className="filters">
        <input type="text" placeholder="Sök titel" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Plats" value={location} onChange={e => setLocation(e.target.value)} />
        
        <input type="date"
        placeholder="Startdatum" 
        value={startDate} 
        onChange={e => setStartDate(e.target.value)} 
        title="Startdatum"
        />
        <input type="date"
        placeholder="Slutdatum"
        value={endDate} 
        onChange={e => setEndDate(e.target.value)} 
        title="Slutdaum"
        />

        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="title">Sortera efter titel</option>
          <option value="date">Sortera efter datum</option>
        </select>
        <select value={order} onChange={e => setOrder(e.target.value)}>
          <option value="asc">(A-Ö / äldst först)</option>
          <option value="desc">(Ö-A / senast först)</option>
        </select>
      </div>

      <div className="events">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h2 className="event-title">{event.title}</h2>
            <p className="event-date">{event.date.split('T')[0]}</p>
            <p className="event-location">{event.location}</p>
            <p className="event-description">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventList

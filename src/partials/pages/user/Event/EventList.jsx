import React from 'react'
import './Event.css'

const mockEvents = [
  {
    id: 1,
    title: 'Musikfestival',
    date: '2025-06-15',
    location: 'Stockholm',
    description: 'Beskrivning saknas.'
  },
  {
    id: 2,
    title: 'Hundmässan',
    date: '2025-05-08',
    location: 'Göteborg',
    description: 'Beskrivning saknas.'
  },
  {
    id: 3,
    title: 'Chokladfestival',
    date: '2025-07-20',
    location: 'Malmö',
    description: 'Beskrivning saknas.'
  }
]

const EventList = () => {
  return (
    <div className="event-list">
      <h1>Kommande evenemang</h1>
      <div className="events">
        {mockEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h2 className="event-title">{event.title}</h2>
            <p className="event-date">{event.date}</p>
            <p className="event-location">{event.location}</p>
            <p className="event-description">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventList

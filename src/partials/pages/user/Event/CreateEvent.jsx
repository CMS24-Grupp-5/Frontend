import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventDetails.css";

const CreateEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};

    if (!event.title.trim()) errors.title = "Title is required.";
    if (!event.date) errors.date = "Date is required.";
    if (!event.location.trim()) errors.location = "Location is required.";
    if (!event.description.trim()) errors.description = "Description is required.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);
    try {
      const res = await fetch("https://eventprovider20250506133954.azurewebsites.net/api/Events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!res.ok) throw new Error("Could not create event.");

      alert("Event created!");
      navigate("/events");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="event-details-card">
      <h2>Create new Event</h2>

      {error && <p className="error-message">Fel: {error}</p>}

      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" value={event.title} onChange={handleChange} />
        {validationErrors.title && <p className="error-message">{validationErrors.title}</p>}
      </div>

      <div className="form-group">
        <label>Date</label>
        <input type="date" name="date" value={event.date} onChange={handleChange} />
        {validationErrors.date && <p className="error-message">{validationErrors.date}</p>}
      </div>

      <div className="form-group">
        <label>Location</label>
        <input type="text" name="location" value={event.location} onChange={handleChange} />
        {validationErrors.location && <p className="error-message">{validationErrors.location}</p>}
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" value={event.description} onChange={handleChange} />
        {validationErrors.description && <p className="error-message">{validationErrors.description}</p>}
      </div>

      <button className="save-button" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Create"}
      </button>
    </div>
  );
};

export default CreateEvent;

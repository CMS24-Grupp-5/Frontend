import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await fetch(`https://eventprovider20250506133954.azurewebsites.net/api/Events/${id}`);
        if (!res.ok) throw new Error("Error when fetching event.");
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);
    try {
      const res = await fetch(`https://eventprovider20250506133954.azurewebsites.net/api/Events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!res.ok) throw new Error("Could not save changes, error...");
      navigate("/events");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`https://eventprovider20250506133954.azurewebsites.net/api/Events/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Could not delete the event, something went wrong..");

      alert("Event deleted!");
      navigate('/events');
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!event.title?.trim()) newErrors.title = "Title is required.";
    if (!event.date) newErrors.date = "Date is required.";
    if (!event.location?.trim()) newErrors.location = "Location is required.";
    if (!event.description?.trim()) newErrors.description = "Description is required.";

    setValidationErrors(newErrors);

    const hasNoErrors = Object.keys(newErrors).length === 0;
    return hasNoErrors;
  };

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>Event could not be found.</p>;

  return (
    <div className="event-details-card">
      <h2>Edit Event</h2>

      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" value={event.title} onChange={handleChange} />
        {validationErrors.title && <p className="error-message">{validationErrors.title}</p>}
      </div>

      <div className="form-group">
        <label>Date</label>
        <input type="date" name="date" value={event.date.split("T")[0]} onChange={handleChange} />
        {validationErrors.date && <p className="error-message">{validationErrors.date}</p>}
      </div>

      <div className="form-group">
        <label>Location</label>
        <input type="text" name="location" value={event.location} onChange={handleChange} />
        {validationErrors.location && <p className="error-message">{validationErrors.location}</p>}
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea value={event.description} name="description" onChange={handleChange} />
        {validationErrors.description && <p className="error-message">{validationErrors.description}</p>}
      </div>

        <div className="buttons">
            <button className="button save-button" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
            </button>

            <button className="button button-secondary" onClick={handleDelete}>
                Delete event
            </button>
        </div>
      
    </div>
  );
};

export default EventDetails;
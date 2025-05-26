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
        if (!res.ok) throw new Error("Något gick fel vid hämtning.");
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

      if (!res.ok) throw new Error("Kunde inte spara ändringar.");

      //else ändringar kunde sparas -> redirect till events-sidan
      navigate("/events");
    } catch (err) {
      alert("Fel: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Är du säker på att du vill ta bort detta evenemang?")) return;

    try {
      const res = await fetch(`https://eventprovider20250506133954.azurewebsites.net/api/Events/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Kunde inte ta bort evenemanget.");

      alert("Evenemang borttaget!");
      //   navigate('/events');
    } catch (err) {
      alert("Fel: " + err.message);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!event.title?.trim()) newErrors.title = "Titel krävs.";
    if (!event.date) newErrors.date = "Datum krävs.";
    if (!event.location?.trim()) newErrors.location = "Plats krävs.";
    if (!event.description?.trim()) newErrors.description = "Beskrivning krävs.";

    setValidationErrors(newErrors);

    const hasNoErrors = Object.keys(newErrors).length === 0;
    return hasNoErrors;
  };

  if (loading) return <p>Laddar evenemang...</p>;
  if (error) return <p>Fel: {error}</p>;
  if (!event) return <p>Evenemanget hittades inte.</p>;

  return (
    <div className="event-details-card">
      <h2>Redigera Evenemang</h2>

      <div className="form-group">
        <label>Titel</label>
        <input type="text" name="title" value={event.title} onChange={handleChange} />
        {validationErrors.title && <p className="error-message">{validationErrors.title}</p>}
      </div>

      <div className="form-group">
        <label>Datum</label>
        <input type="date" name="date" value={event.date.split("T")[0]} onChange={handleChange} />
        {validationErrors.date && <p className="error-message">{validationErrors.date}</p>}
      </div>

      <div className="form-group">
        <label>Plats</label>
        <input type="text" name="location" value={event.location} onChange={handleChange} />
        {validationErrors.location && <p className="error-message">{validationErrors.location}</p>}
      </div>

      <div className="form-group">
        <label>Beskrivning</label>
        <textarea value={event.description} name="description" onChange={handleChange} />
        {validationErrors.description && <p className="error-message">{validationErrors.description}</p>}
      </div>

      <button className="save-button" onClick={handleSave} disabled={saving}>
        {saving ? "Sparar..." : "Spara"}
      </button>

      <button className="delete-button" onClick={handleDelete}>
        Ta bort evenemang
      </button>
    </div>
  );
};

export default EventDetails;
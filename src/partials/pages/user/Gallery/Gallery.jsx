import { useEffect, useState } from "react";
import "./Gallery.css";
import { Spinner } from "../../../Componants/Spinner/Spinner";
import ImagePlaceHolder from "../../../../images/imagePlaceholder.jpg";

function Gallery() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    urlImage: "",
    description: "",
  });

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(
          "https://artistsprovider-aqegcadnaqb4cdbk.swedencentral-01.azurewebsites.net/api/artists"
        );
        if (!response.ok) throw new Error("Failed to fetch artists");
        const data = await response.json();
        setArtists(data);
      } catch (err) {
        console.error("Error fetching artists:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://artistsprovider-aqegcadnaqb4cdbk.swedencentral-01.azurewebsites.net/api/artists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      if (!response.ok) throw new Error("Failed to add artist");
      const newArtist = await response.json();
      setArtists([...artists, newArtist]);
      setForm({ name: "", urlImage: "", description: "" });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error adding artist");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artist?")) return;

    try {
      const response = await fetch(
        `https://artistsprovider-aqegcadnaqb4cdbk.swedencentral-01.azurewebsites.net/api/artists/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete artist");

      setArtists(artists.filter((artist) => artist.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting artist");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1 className="gallery-title">Artist Gallery</h1>
        <button className="add-artist-btn" onClick={() => setIsModalOpen(true)}>
          Add Artist
        </button>
      </div>

      <div className="artist-grid">
        {artists.map((artist) => (
          <div key={artist.id} className="artist-card">
            <img
              src={artist.urlImage || ImagePlaceHolder}
              alt={artist.name}
              className="artist-image"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = ImagePlaceHolder;
              }}
            />
            <h2 className="artist-name">
              {artist.name || "No name available"}
            </h2>
            <p>{artist.description || "No descrpition available"}</p>
            <button
              className="delete-artist-btn"
              onClick={() => handleDelete(artist.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Artist</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Image URL:
                <input
                  type="text"
                  value={form.urlImage}
                  onChange={(e) =>
                    setForm({ ...form, urlImage: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </label>
              <div className="modal-buttons">
                <button type="submit">Add</button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;

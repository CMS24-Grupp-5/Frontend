import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import "./Feedback.css";

function Feedback() {
  const { isAuthenticated } = useAuth();
  const [author, setAuthor] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const authData = JSON.parse(localStorage.getItem("auth"));
  const userId = authData?.userId;

  useEffect(() => {
    if (!userId) return;

    const fetchAuthor = async () => {
      try {
        const response = await fetch(
          `https://profileprovider-fngrbjb8h9dee0d6.swedencentral-01.azurewebsites.net/api/Profiles/${userId}`,
          {
            headers: {
              "x-api-key":
                "IntcInVzZXJJZFwiOlwiMDQ2ZDFlMWItY2VlOC00NGE4LWEzYjUtYTgyNmE5Y2NjMTVjXCJ9Ig==",
            },
          }
        );
        const data = await response.json();
        setAuthor(data.firstName || "Uknown Name");
      } catch (error) {
        console.error("Failed to fetch author name", error);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(
          "https://feedbackprovider-cvcre5h4epf7bnfg.swedencentral-01.azurewebsites.net/api/Feedbacks"
        );
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error("Error loading feedbacks:", err);
      }
    };

    fetchAuthor();
    fetchFeedbacks();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const feedback = {
      feedbackText,
      author,
    };

    try {
      await fetch(
        "https://feedbackprovider-cvcre5h4epf7bnfg.swedencentral-01.azurewebsites.net/api/Feedbacks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedback),
        }
      );

      setFeedbackText("");
      setIsModalOpen(false);

      const updated = await fetch(
        "https://feedbackprovider-cvcre5h4epf7bnfg.swedencentral-01.azurewebsites.net/api/Feedbacks"
      );
      const data = await updated.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h2 className="feedback-title">Feedback</h2>
        {isAuthenticated && (
          <button
            className="feedback-add-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Add Feedback
          </button>
        )}
      </div>

      <div className="feedback-list">
        {feedbacks.map((fb) => (
          <div key={fb.id} className="feedback-item">
            <p>{fb.feedbackText}</p>
            <small>- {fb.author}</small>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1>Add Feedback</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Message:
                <textarea
                  rows="4"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  required
                />
              </label>
              <div className="modal-buttons">
                <button type="submit">Submit</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}
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

export default Feedback;

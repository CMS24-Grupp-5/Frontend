import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../SignIn/SignIn.css";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://localhost:7147/api/profiles/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FirstName: firstName,
            LastName: lastName,
            PhoneNumber: phoneNumber,
          }),
        }
      );

      if (!response.ok) throw new Error("Profile completion failed");

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupContainer">
      <h2 className="signupHeader">Complete Profile</h2>
      <form onSubmit={handleSubmit} className="formContainer" noValidate>
        <div className="inputWrapper">
          <label className="inputLabel">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="inputField"
          />
        </div>

        <div className="inputWrapper">
          <label className="inputLabel">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="inputField"
          />
        </div>

        <div className="inputWrapper">
          <label className="inputLabel">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="inputField"
          />
        </div>

        {error && <div className="errorMessage">{error}</div>}
        {loading && (
          <div className="loading">
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}

        <button type="submit" className="submitButton" disabled={loading}>
          {loading ? "Saving..." : "Save and Continue"}
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;

import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../auth/SignIn/SignIn.css";

const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) newErrors.email = "Invalid email format.";

    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters long.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setGeneralError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      await signUp({ firstName, lastName, email, password, phoneNumber });
      navigate("/");
    } catch (err) {
      setGeneralError(err.message || "Unable to sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupContainer">
      <h2 className="signupHeader">Sign Up</h2>
      <form onSubmit={handleSubmit} className="formContainer" noValidate>
        <div className="inputWrapper">
          <label className="inputLabel">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="inputField"
          />
          {errors.firstName && (
            <div className="formErrorMessage">{errors.firstName}</div>
          )}
        </div>

        <div className="inputWrapper">
          <label className="inputLabel">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="inputField"
          />
          {errors.lastName && (
            <div className="formErrorMessage">{errors.lastName}</div>
          )}
        </div>

        <div className="inputWrapper">
          <label className="inputLabel">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputField"
          />
          {errors.email && (
            <div className="formErrorMessage">{errors.email}</div>
          )}
        </div>

        <div className="inputWrapper">
          <label className="inputLabel">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputField"
          />
          {errors.password && (
            <div className="formErrorMessage">{errors.password}</div>
          )}
        </div>

        <div className="inputWrapper">
          <label className="inputLabel">Phone Number (optional)</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="inputField"
          />
        </div>

        {generalError && <div className="errorMessage">{generalError}</div>}
        {loading && <div className="loading">Signing up...</div>}

        <button type="submit" className="submitButton" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;

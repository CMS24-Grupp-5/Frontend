import React, { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../SignIn/SignIn.css"; // samma CSS

const SignUpStepOne = () => {
    const { signUp } = useAuth();
    const navigate = useNavigate();
  
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);
  
    const validateForm = () => {
      const newErrors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailRegex.test(email)) newErrors.email = "Invalid email format.";
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setGeneralError("");
      if (!validateForm()) return;
  
      setLoading(true);
      try {
        await signUp({ email });
        navigate("/signupvalidate");
      } catch (err) {
        setGeneralError(err.message || "Signup failed");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="signupContainer">
        <h2 className="signupHeader">Sign up</h2>
        <form onSubmit={handleSubmit} className="formContainer" noValidate>
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
  
          {generalError && <div className="errorMessage">{generalError}</div>}
          {loading && (
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
  
          <button type="submit" className="submitButton" disabled={loading}>
            {loading ? "Loading..." : "Next"}
          </button>
        </form>
      </div>
    );
  };
  
  export default SignUpStepOne;
  
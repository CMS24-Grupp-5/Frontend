import React, { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../Componants/Spinner/Spinner";
import "../SignIn/SignIn.css";

const SignUpStepThree = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters long.";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    if (!validateForm()) return;

    setLoading(true);
    try {
    
    let email = localStorage.getItem("email");
    signUp({ email, password })
    
    navigate("/profile");
    } catch (err) {
      setGeneralError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupContainer">
      <h2 className="signupHeader">Sign Up</h2>
      <form onSubmit={handleSubmit} className="formContainer" noValidate>

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
          <label className="inputLabel">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="inputField"
          />
          {errors.confirmPassword && (
            <div className="formErrorMessage">{errors.confirmPassword}</div>
          )}
        </div>

        {generalError && <div className="errorMessage">{generalError}</div>}
        {loading && <Spinner />}

        <button type="submit" className="submitButton" disabled={loading}>
          {loading ? "Loading..." : "Next"}
        </button>
      </form>
    </div>
  );
};

export default SignUpStepThree;

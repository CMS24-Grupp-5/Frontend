import React, { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setEmailError("");
    setPasswordError("");
    setLoading(true);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let hasError = false;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
      hasError = true;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      await signIn({ email, password, isPersistent: false });
      navigate("/");
    } catch (err) {
      setError("Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signinContainer">
      <h2 className="signinHeader">Sign In</h2>
      <form onSubmit={handleSubmit} className="formContainer" noValidate>
        <div className="inputWrapper">
          <label htmlFor="email" className="inputLabel">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputField"
            required
          />
          {emailError && <div className="formErrorMessage">{emailError}</div>}
        </div>

        <div className="inputWrapper">
          <label htmlFor="password" className="inputLabel">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputField"
            required
          />
          {passwordError && (
            <div className="formErrorMessage">{passwordError}</div>
          )}
        </div>
        {loading && <div className="loading">Signing in...</div>}
        {error && <div className="errorMessage">{error}</div>}

        <button type="submit" className="submitButton" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;

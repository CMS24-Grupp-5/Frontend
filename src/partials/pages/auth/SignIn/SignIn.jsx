import React, { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { Spinner } from "../../../Componants/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("test78@gmail.com");
  const [password, setPassword] = useState("BytMig123.");
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
        {loading && (
          <div className="loading">
            <Spinner />
          </div>
        )}
        {error && <div className="errorMessage">{error}</div>}

        <button type="submit" className="submitButton" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>
        <div>
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="dontHaveAccount">
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

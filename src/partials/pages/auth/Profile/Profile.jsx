
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../../contexts/ProfileContext";
import { Spinner } from "../../../Componants/Spinner/Spinner";
import ProfileFormModal from "./ProfileFormModal";

import "../SignIn/SignIn.css";

const Profile = () => {
  const navigate = useNavigate();

  const { profile, setProfile } = useProfile();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { userId } = JSON.parse(localStorage.getItem("auth") || "{}");

  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phoneNumber: profile.phoneNumber || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError("");
    setLoading(true);

    const payload = {
      FirstName: form.firstName,
      LastName: form.lastName,
      PhoneNumber: form.phoneNumber,
      Id: userId,
    };

    try {
      const endpoint = profile
        ? "https://localhost:7147/api/profiles/update"
        : "https://localhost:7147/api/profiles/create";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Kunde inte spara profilen");

      const savedProfile = await response.json();
      setProfile(savedProfile); //
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Något gick fel");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupContainer">
      <h2 className="signupHeader">
        {profile ? "Redigera Profil" : "Complete Profile"}
      </h2>
      {loading && <Spinner />}
      <ProfileFormModal
        form={form}
        onChange={handleChange}
        onSave={handleSave}
        isSaving={loading}
        isEmbedded={true}
        error={error}
      />

    </div>
  );
};

export default Profile;

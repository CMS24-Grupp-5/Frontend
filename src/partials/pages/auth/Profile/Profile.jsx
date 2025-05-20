import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../../contexts/ProfileContext";
import { Spinner } from "../../../Componants/Spinner/Spinner";
import ProfileFormModal from "../Profile/ProfileFormModal";
import "../SignIn/SignIn.css";

const Profile = () => {
  const navigate = useNavigate();
  const { setProfile } = useProfile();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const authData = localStorage.getItem("auth");
  const { userId } = JSON.parse(authData);
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
      const response = await fetch(
        "https://localhost:7147/api/profiles/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Profile completion failed");

      const savedProfile = await response.json();
      setProfile(savedProfile);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Något gick fel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupContainer">
      <h2 className="signupHeader">Complete Profile</h2>
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

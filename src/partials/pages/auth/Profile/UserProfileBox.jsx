import React, { useState } from "react";
import { useProfile } from "../../../../contexts/ProfileContext";
import ProfileFormModal from "./ProfileFormModal";

const UserProfileBox = () => {
  const { profile, setProfile } = useProfile();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(profile || {});
  const [saving, setSaving] = useState(false);
  console.log(localStorage.getItem("userId"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      FirstName: form.firstName,
      LastName: form.lastName,
      PhoneNumber: form.phoneNumber,
      Id: localStorage.getItem("userId"),
    };

    try {
      const response = await fetch(
        "https://localhost:7147/api/Profiles/Update",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Kunde inte uppdatera profilen");

      setProfile({ ...profile, ...form });
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div
        className="user-profile"
        onClick={() => {
          setForm(profile);
          setShowModal(true);
        }}
      >
        <div className="profile-image">
          <i className="fa-solid fa-user"></i>
        </div>
        <div className="profile-info">
          <span className="user-name">
            {profile?.firstName || "Förnamn"} {profile?.lastName || ""}
          </span>
          <span className="user-role">Användare</span>
        </div>
      </div>

      {showModal && (
        <ProfileFormModal
          form={form}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
          isSaving={saving}
        />
      )}
    </>
  );
};

export default UserProfileBox;

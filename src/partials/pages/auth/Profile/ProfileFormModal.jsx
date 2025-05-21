const ProfileFormModal = ({
  form,
  onChange,
  onSave,
  onClose,
  isSaving,
  isEmbedded = false,
  error,
}) => {
  return (
    <div className={isEmbedded ? "embedded-form" : "modal"}>
      <div className={isEmbedded ? "" : "modal-content"}>
        {!isEmbedded && <h2>Profil</h2>}
        <input
          name="firstName"
          value={form.firstName || ""}
          onChange={onChange}
          placeholder="Förnamn"
        />
        <input
          name="lastName"
          value={form.lastName || ""}
          onChange={onChange}
          placeholder="Efternamn"
        />
        <input
          name="phoneNumber"
          value={form.phoneNumber || ""}
          onChange={onChange}
          placeholder="Telefonnummer"
        />
        {error && <div className="errorMessage">{error}</div>}
        <button onClick={onSave} disabled={isSaving}>
          {isSaving ? "Sparar..." : "Spara"}
        </button>
        {!isEmbedded && <button onClick={onClose}>Stäng</button>}
      </div>
    </div>
  );
};

export default ProfileFormModal;

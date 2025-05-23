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
    <div className={isEmbedded ? "embedded-form" : "modal signinContainer"}>
      <div className={isEmbedded ? "" : "modal-content formContainer"}>
        {!isEmbedded && <h2 className="signinHeader">Profil</h2>}
        <div className="inputWrapper">
          <input
            className="inputField"
            name="firstName"
            value={form.firstName || ""}
            onChange={onChange}
            placeholder="Förnamn"
          />
        </div>
        <div className="inputWrapper">
          <input
            className="inputField"
            name="lastName"
            value={form.lastName || ""}
            onChange={onChange}
            placeholder="Efternamn"
          />
        </div>
        <div className="inputWrapper">
          <input
            className="inputField"
            name="phoneNumber"
            value={form.phoneNumber || ""}
            onChange={onChange}
            placeholder="Telefonnummer"
          />
        </div>
        {error && <div className="errorMessage">{error}</div>}
        <button className="submitButton" onClick={onSave} disabled={isSaving}>
          {isSaving ? "Sparar..." : "Spara"}
        </button>
        {!isEmbedded && (
          <button className="submitButton" onClick={onClose}>
            Stäng
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileFormModal;

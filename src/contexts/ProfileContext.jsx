import { createContext, useContext, useState, useEffect } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const loadProfile = async () => {
    const auth = localStorage.getItem("auth");
    if (!auth) return;

    const { userId } = JSON.parse(auth);

    try {
      const response = await fetch(
        "https://localhost:7147/api/Profiles/GetById",
        
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userId), // servern tar emot en string, inte ett objekt
        }
      );

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      console.error("Profile fetch failed:", err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, loadProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

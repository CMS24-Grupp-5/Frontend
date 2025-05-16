import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("user") !== null;
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsAuthenticated(true);
    }
  }, []);
  //När funktionen körs så kommer det posta till url email och password finns det i databasen loggas anväder in.
  //När användaren loggas in så sparas user objektet i localStorage och isAuthenticated sätts till true.
  //När användaren loggas ut så tas user objektet bort från localStorage och isAuthenticated sätts till false.
  const signIn = async ({ email, password, isPersistent }) => {
    try {
      const response = await fetch("https://localhost:7063/api/login/Login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data));
      if (localStorage.getItem("user")) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
      throw error;
    }
  };

  const signUp = async ({ email, password }) => {
    try {
      const response = await fetch(
        "https://signupprovider-e5ggb2gkh6ewazbw.swedencentral-01.azurewebsites.net/api/SignUp/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const errorData = contentType?.includes("application/json")
          ? await response.json()
          : await response.text();
        throw new Error(errorData.message || errorData || "Signup failed");
      }

      const data = contentType?.includes("application/json")
        ? await response.json()
        : { message: await response.text() };

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data.user ?? null);
      setIsAuthenticated(true);

      return data;
    } catch (error) {
      console.error("Sign-up failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, user, signUp, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

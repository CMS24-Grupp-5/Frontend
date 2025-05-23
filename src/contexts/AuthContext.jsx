import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("auth") !== null;
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    //Här validerar vi tokenen som finns i localStorage.
    //Om tokenen är giltig så sätts isAuthenticated till true annars sätts den till false.
    const validateToken = async () => {
      const authData = localStorage.getItem("auth");

      if (!authData) {
        setIsAuthenticated(false);
        return;
      }

      const { userId, token } = JSON.parse(authData);

      if (!userId || !token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(
          "https://tokenprovider-csananbbhte7d3h0.swedencentral-01.azurewebsites.net/api/ValidateToken?code=fhOSbniVnX5wGk_GvC5bvAzF4lnhf3B7-W9AnFct2PIJAzFu9kC0DA==",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: userId,
              accessToken: token,
            }),
          }
        );

        const result = await response.json();

        if (result.succeeded) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("auth");
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsAuthenticated(false);
        localStorage.removeItem("auth");
      }
    };

    validateToken();
  }, []);

  //När funktionen körs så kommer det posta till url email och password finns det i databasen loggas anväder in.
  //När användaren loggas in så sparas user objektet i localStorage och isAuthenticated sätts till true.
  //När användaren loggas ut så tas user objektet bort från localStorage och isAuthenticated sätts till false.
  const signIn = async ({ email, password, isPersistent }) => {
    try {
      const response = await fetch(
        "https://loginhandler-d9b7enhabmbud0em.swedencentral-01.azurewebsites.net/api/login/Login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      const RoleResponse = await fetch(
        `https://accountserviceprovider-g5gnanhufngbezgt.swedencentral-01.azurewebsites.net/api/Roles/getroles?id=${data.userId}`,
        {
          method: "GET",
        }
      );

      if (!RoleResponse.ok) {
        throw new Error("Failed to fetch role");
      }

      const roleData = await RoleResponse.json();
      localStorage.setItem("role", JSON.stringify({ role: roleData }));
      if (roleData.role === "Admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      // Här skapar vi tokenen när en använder loggar in och sparar userId och token i localStorage
      // och sätter isAuthenticated till true.
      const tokenResponse = await fetch(
        "https://tokenprovider-csananbbhte7d3h0.swedencentral-01.azurewebsites.net/api/GenerateToken?code=TcdLVOTzog57NqJh_XQJSTfD3qYdBB6wlpv3ekxwz9AiAzFubeO4gQ==",

        {
          method: "POST",
          body: JSON.stringify({ userId: data.userId }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const tokenData = await tokenResponse.json();

      localStorage.setItem(
        "auth",
        JSON.stringify({
          userId: data.userId,
          token: tokenData.accessToken,
        })
      );

      setUser(data.user);
      if (localStorage.getItem("auth")) {
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
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

      setUser(data.user ?? null);
      setIsAuthenticated(true);

      // 👉 Korrekt: anropa signIn **efter** att kontot skapats
      await signIn({ email, password });

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

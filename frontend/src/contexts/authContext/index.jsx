import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserLoggedIn(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser,
    handleSignOut, // Add sign-out handler to context
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

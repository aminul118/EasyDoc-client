import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  // Signed up
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Logout
  const logOut = () => {
    toast.success("Sign out");
    return signOut(auth);
  };

  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  // Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Current User:", currentUser);
        setUser(currentUser);
        setLoading(false);
        const userInfo = { email: currentUser.email };
        if (currentUser) {
          // Get token and store to local stroage
          axiosPublic.post("/jwt", userInfo).then((res) => {
            if (res.data.token) {
              const token = res.data.token;
              localStorage.setItem("token", token);
            }
          });
        }
      } else {
        //
        console.log("User signed out");
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, axiosPublic]);

  const authInfo = {
    createUser,
    login,
    googleLogin,
    logOut,
    setUser,
    updateUserProfile,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

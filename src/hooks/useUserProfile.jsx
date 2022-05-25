import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import axiosFetch from "../vendors/axios";

export default function useUser() {
  const [firebaseUser] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    axiosFetch
      .get(`http://localhost:5000/userProfile/${firebaseUser.email}`)
      .then((res) => setUserProfile(res.data));
  }, [firebaseUser]);
  return [userProfile];
}

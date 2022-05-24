import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";

export default function useUser() {
  const [firebaseUser] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/userProfile/${firebaseUser.email}`)
      .then((res) => res.json())
      .then((data) => setUserProfile(data));
  }, [firebaseUser]);
  return [userProfile];
}

import { useEffect, useState } from "react";
import useUserProfile from "../hooks/useUserProfile";
export default function useIsAdmin(email) {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (!email) return;
    fetch(`http://localhost:5000/isAdmin/${email}`)
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.isAdmin));
  }, [email]);

  return [isAdmin];
}

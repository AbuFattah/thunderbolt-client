import { useEffect, useState } from "react";
export default function useIsAdmin(email) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    if (!email) return;
    fetch(`http://localhost:5000/isAdmin/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.isAdmin);
        setAdminLoading(false);
      });
    //? warning: DO NOT write--- setAdminLoading(false)---- after fetch;
    //? since both fetch and setAdminLoading are asynchronous loading state will behave unexpectedly
  }, [email]);

  return [isAdmin, adminLoading];
}

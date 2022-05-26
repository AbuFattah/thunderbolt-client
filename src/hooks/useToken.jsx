import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (!user) return;

    fetch("https://quiet-sierra-02011.herokuapp.com/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: user?.email, name: user?.displayName }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data);
        localStorage.setItem("accessToken", data.token);
      });
  }, [user]);

  return token;
};

export default useToken;

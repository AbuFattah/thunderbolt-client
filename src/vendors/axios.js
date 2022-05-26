import axios from "axios";

const axiosFetch = axios.create({
  // baseURL: "",
  headers: {
    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export default axiosFetch;

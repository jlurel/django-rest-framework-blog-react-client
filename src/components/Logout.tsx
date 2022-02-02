import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers.common["Authorization"] = "";
    navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return <div>Logout</div>;
};

export default Logout;

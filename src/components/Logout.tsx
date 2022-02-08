import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import UserContext from "../context/UserContext";

const Logout = () => {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

  useEffect(() => {
    axiosInstance.post("user/logout/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers.common["Authorization"] = "";

    if (userContext) {
      userContext.setUser(null);
    }

    navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Logout</div>;
};

export default Logout;

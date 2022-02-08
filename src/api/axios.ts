import axios from "axios";

const baseUrl = "http://localhost:8000/api/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? `JWT ${localStorage.getItem("access_token")}`
      : "",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Go to login page if refresh token is expired
    if (
      error.response.status === 401 &&
      originalRequest.url === `${baseUrl}token/refresh`
    ) {
      window.location.href = "/login/";
    }

    // Refresh token if access token is expired
    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        const tokenParts = JSON.parse(window.atob(refreshToken.split(".")[1]));
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          try {
            const response = await axiosInstance.post("token/refresh/", {
              refresh: refreshToken,
            });
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);

            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `JWT ${response.data.access}`;
            originalRequest.headers[
              "Authorization"
            ] = `JWT ${response.data.access}`;
            return await axiosInstance(originalRequest);
          } catch (error_1) {
            return console.log(error_1);
          }
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token is not available.");
        window.location.href = "/login/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

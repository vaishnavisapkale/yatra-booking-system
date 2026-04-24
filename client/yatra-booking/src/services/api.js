import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api"
});

// token auto attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 ||
        error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        console.log("🔥 Calling refresh token API...");

        const { data } = await axios.post(
          "http://localhost:3000/api/auth/refresh-token",
          { token: refreshToken }
        );

        // save new token
        localStorage.setItem("token", data.accessToken);

        // update header
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        // retry original request
        return API(originalRequest);

      } catch (err) {
        console.log("❌ Refresh failed");

        localStorage.clear();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
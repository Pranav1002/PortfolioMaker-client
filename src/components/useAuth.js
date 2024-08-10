import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";

const useAuth = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [lastFetchTime, setLastFetchTime] = useState(localStorage.getItem("lastFetchTime"));

  const fetchNewAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await fetch("http://localhost:8384/api/v1/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    
    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.accessToken);
      const currentTime = new Date().getTime();
      setLastFetchTime(currentTime);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("lastFetchTime", currentTime);
      return data.accessToken;
    } else {
      // Handle token refresh failure (e.g., redirect to login)
      console.error("Failed to refresh access token");
      return null;
    }
  };

  const getAccessToken = async () => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastFetchTime;

    if (timeDiff > 15 * 60 * 1000) {
      // Access token expired, fetch new one
      return await fetchNewAccessToken();
    } else {
      // Access token still valid
      return accessToken;
    }
  };

  return { getAccessToken };
};

export default useAuth;

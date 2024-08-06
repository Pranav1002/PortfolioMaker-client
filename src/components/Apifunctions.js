import axios from "axios"
import { useState } from "react"
import { ReactSession } from "react-client-session";

const customFetch = axios.create({
    baseURL: "http://localhost:8384/api/v1",
    headers: {
      "Content-type": "application/json",
    },
    // withCredentials: true,
  });


const refreshToken = async () => {
    try {
      const resp = await customFetch.get("auth/refresh");
      console.log("refresh token", resp.data);
      return resp.data;
    } catch (e) {
      console.log("Error",e);   
    }
  };


  customFetch.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("user");
      const user = JSON.parse(token)
      console.log(user)
      if (token) {
        config.headers["Authorization"] = ` bearer ${user.jwt}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      console.log(error)
      if (error.response && error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        const resp = await refreshToken();
  
        const access_token = resp.response.accessToken;
  
        localStorage.setItem("token",access_token);
        customFetch.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        return customFetch(originalRequest);
      }
      return Promise.reject(error);
    }
  );
  

  export const registerUser = async (userData) => {
    try {
      const response = await customFetch.post("auth/register", userData);
      console.log("Registration successful:", response.data);
      window.location.href = '/login';
      return response.data; // You may return any relevant data from the response
    } catch (error) {
      console.error("Error during registration:", error);
      throw error; // You may handle the error as per your application's requirements
    }
  };
  
  export const loginUser = async (credentials) => {
    try {
      const response = await customFetch.post("auth/login", credentials);
      console.log("Login successful:", response.data);
      window.location.href='/home';
      const responseData = await response.json();
      ReactSession.set("user", responseData);
      return response.data; // You may return any relevant data from the response
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // You may handle the error as per your application's requirements
    }
  };

  export const fetchProfileData = async (userId) => {
    try {
      const response = await customFetch.get(`profiles/get/${userId}`);
      console.log(response.data); // Log response data directly
      if (response.status === 200) { // Check status code
        return response.data;
      } else {
        throw new Error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      throw error;
    }
  };

  export const fetchEducationData = async (userId) => {
    try {
      const response = await customFetch.get(`/educations/get/${userId}`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch education data");
      }
    } catch (error) {
      console.error("Error fetching education data:", error);
      throw error;
    }
  };
  
  // Function to add education data
  export const addEducationData = async (educationData) => {
    try {
      const response = await customFetch.post("/educations", educationData);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to add education data");
      }
    } catch (error) {
      console.error("Error adding education data:", error);
      throw error;
    }
  };
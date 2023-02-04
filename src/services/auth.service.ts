import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "/login", { username, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response;
    });
};
export const logout = () => localStorage.removeItem("user");

export const register = (username: string, password: string) => {
  return axios
    .post(API_URL + "/register", { username, password })
    .then((response) => {
      return response;
    });
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : {};
};

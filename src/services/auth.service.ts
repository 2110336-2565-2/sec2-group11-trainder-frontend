import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

interface LoginResponse {
  status: number;
  message?: string;
  token?: string;
  username?: string;
}

export const login = (username: string, password: string) => {
  return axios
    .post<LoginResponse>(API_URL + "/login", { username, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      }
      throw error;
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
export const checkLoggedIn = (): boolean => {
  return !!localStorage.getItem("user");
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : {};
};

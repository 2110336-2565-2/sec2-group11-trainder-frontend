import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

type LoginResponse = {
  status: number;
  message?: string;
  token?: string;
  username?: string;
};
export type RegistrationData = {
  username: string;
  password: string;
  userType: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  citizenId: string;
  gender: string;
  phoneNumber: string;
  address: string;
  lat: number;
  lng: number;
};

export type User = {
  token: string;
  username: string;
  firstname: string;
  lastname: string;
  usertype: string;
}

export const login = (username: string, password: string) => {
  return axios
    .post<LoginResponse>(API_URL + "/login", { username, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setCurrentUserNameAndRole();
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
export const register = (registrationData: RegistrationData) => {
  return axios.post(API_URL + "/register", registrationData);
};
export const checkLoggedIn = (): Promise<boolean> => {
  if (localStorage.getItem("user")) {
    return axios
      .get(API_URL + "/protected/profile", {
        headers: authHeader(),
      })
      .then(() => true)
      .catch(() => false);
  } else {
    return Promise.resolve(false);
  }
};

export const setCurrentUserNameAndRole = () => {
  return axios.get(API_URL + "/protected/get-name-and-role",
    {
      headers: authHeader(), params: { username: getCurrentUser().username }
    }).then((response) => {
      const currentUser = getCurrentUser();
      const user = response.data.result as User;
      user.token = currentUser.token as string;
      user.username = currentUser.username as string;
      localStorage.setItem("user", JSON.stringify(user));
    })
}

export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : {};
  } else {
    return {};
  }
};

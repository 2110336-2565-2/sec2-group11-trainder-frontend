import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

interface CurrentUserData {
  username: string;
}

export const getCurrentUserFromAPI = () => {
  return axios
    .get<CurrentUserData>(API_URL + "/protected/user", {
      headers: authHeader(),
    })
    .then((response) => response.data);
};

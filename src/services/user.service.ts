import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

interface UserProfile {
  username: string;
}

export const getCurrentUserProfile = () => {
  return axios
    .get<UserProfile>(API_URL + "/protected/profile", {
      headers: authHeader(),
    })
    .then((response) => response.data);
};

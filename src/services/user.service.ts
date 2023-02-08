import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export type UserProfile = {
  username: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  citizenId: string;
  gender: string;
  phoneNumber: string;
  address: string;
  subAddress: string;
};

export const getCurrentUserProfile = () => {
  return axios
    .get(API_URL + "/protected/profile", {
      headers: authHeader(),
    })
    .then((response) => response.data.user as UserProfile)
    .catch((error) => {
      throw error;
    });
};

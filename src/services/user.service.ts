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
  usertype: string;
};

export const getCurrentUserProfile = () => {
  return axios
    .get(API_URL + "/protected/profile", {
      headers: authHeader(),
    })
    .then((response) => {
      // TODO: Dirty hack fix this.
      const r = response.data.user;
      const profile = r as UserProfile;
      profile.birthdate = new Date(r.birthdate);
      return profile;
    })
    .catch((error) => {
      throw error;
    });
};

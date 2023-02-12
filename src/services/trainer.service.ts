import axios from "axios";
import { userInfo } from "os";
import authHeader from "./auth-header";
import { UserProfile } from "./user.service";
const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export type UpdateTrainerInfo = {
  specialty: string[];
  rating: number;
  fee: number;
  traineeCount: number;
  certificateUrl: string;
};

export type FilterInput = {
  limit: number;
  specialty: string[];
};

export const updateTrainerProfile = (updateTrainerInfo: UpdateTrainerInfo) => {
  return axios
    .post(API_URL + "/protected/update-trainer", updateTrainerInfo, {
      headers: authHeader(),
    })
    .catch((error) => {
      throw error;
    });
};

export const filterTrainer = (filterInput: FilterInput) => {
  return axios
    .post(API_URL + "/protected/filter-trainer", filterInput, {
      headers: authHeader(),
    })
    .then((response) => {
      const r = response.data.user;
      var result = [];
      for (let i = 0; i < r.length; i++) {
        let trainer = r[i] as UserProfile;
        trainer.birthdate = new Date(r[i].birthdate);
        result.push(trainer);
      }
      return r;
    })
    .catch((error) => {
      throw error;
    });
};

export const getTrainerProfile = (username: string) => {
  return axios
    .post(
      API_URL + "/protected/trainer",
      {
        username: username,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      const r = response.data.user;
      console.log(r);
      const profile = r as UserProfile;
      profile.birthdate = new Date(r.birthdate);
      return profile;
    })
    .catch((error) => {
      throw error;
    });
};

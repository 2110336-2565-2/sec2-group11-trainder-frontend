import axios from "axios";
import authHeader from "./auth-header";
import { UserProfile } from "./user.service";
const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export type TrainerProfile = {
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

export const updateTrainerProfile = (updateTrainerInfo: TrainerProfile) => {
  return axios
    .post(API_URL + "/protected/update-trainer", updateTrainerInfo, {
      headers: authHeader(),
    })
    .catch((error) => {
      throw error;
    });
};

type FilteredTrainerProfile = {
  address: string;
  avatarUrl: string;
  firstname: string;
  gender: string;
  lastname: string;
  trainerInfo: TrainerProfile;
  username: string;
};

export const filterTrainer = (filterInput: FilterInput) => {
  return axios
    .post(API_URL + "/protected/filter-trainer", filterInput, {
      headers: authHeader(),
    })
    .then((response) => {
      let filteredTrainerProfiles: FilteredTrainerProfile[] = [];
      response.data.trainers.forEach((trainerUserProfile: any) => {
        const trainer = trainerUserProfile as FilteredTrainerProfile;
        console.log(trainer);
        filteredTrainerProfiles.push(trainer);
      });
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
      const userDataResponse = response.data.user;
      const userProfile = userDataResponse as UserProfile;
      userProfile.birthdate = new Date(userDataResponse.birthdate);
      const trainerProfile = response.data.trainerInfo as TrainerProfile;
      return { userProfile: userProfile, trainerProfile: trainerProfile };
    })
    .catch((error) => {
      throw error;
    });
};

export const getCurrentTrainerInfo = () => {
  return axios
    .get(API_URL + "/protected/trainer-profile", {
      headers: authHeader(),
    })
    .then((response) => {
      const info = response.data.trainerInfo as TrainerProfile;
      return info;
    })
    .catch((error) => {
      throw error;
    });
};

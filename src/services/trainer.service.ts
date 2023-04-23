import axios from "axios";
import authHeader from "./auth-header";
import { UserProfile, getProfileImage } from "./user.service";
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
export type FilteredTrainerProfile = {
  address: string;
  avatarUrl: string;
  firstname: string;
  gender: string;
  lastname: string;
  trainerInfo: TrainerProfile;
  username: string;
  image: File | null;
};

export type Review = {
  Comment: string;
  CreatedAt: string;
  Rating: number;
  Username: string;
};

export type ReviewInput = {
  comment: string;
  rating: number;
  trainerUsername: string;
}

export const updateTrainerProfile = (updateTrainerInfo: TrainerProfile) => {
  return axios
    .post(API_URL + "/protected/update-trainer", updateTrainerInfo, {
      headers: authHeader(),
    })
    .catch((error) => {
      throw error;
    });
};

export const filterTrainer = (
  filterInput: FilterInput
): Promise<FilteredTrainerProfile[]> => {
  return axios
    .post(API_URL + "/protected/filter-trainer", filterInput, {
      headers: authHeader(),
    })
    .then(async (response) => {
      let filteredTrainerProfiles: FilteredTrainerProfile[] = [];
      await Promise.all(response.data.trainers.map(async (trainerUserProfile: any) => {
        const trainer = trainerUserProfile as FilteredTrainerProfile;
        await getProfileImage(trainer.username).then((image) => {
          trainer.image = image;
        })
        filteredTrainerProfiles.push(trainer);
      }));
      return filteredTrainerProfiles;
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
      if (info.specialty === null) {
        info.specialty = [];
      }
      return info;
    })
    .catch((error) => {
      throw error;
    });
};

export const getTrainerReviews = (username: string) => {
  return axios
    .post(
      API_URL + "/protected/reviews",
      {
        limit: 10,
        trainerUsername: username,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      const reviews = response.data.reviews as Review[];
      return reviews;
    })
    .catch((error) => {
      throw error;
    });
};

export const checkReviewable = (username: string) => {
  return axios
    .post(API_URL + "/protected/reviewable",
      { trainerUsername: username }, {
      headers: authHeader()
    })
    .then((res) => {
      const canReview = res.data.canReview as boolean;
      return canReview;
    })
    .catch((error) => {
      // TODO: this should be fixed after set payment status.
      // throw (error);
      return false;
    })
}


export const addTrainerReviews = (reviewInput: ReviewInput) => {
  return axios
    .post(API_URL + "/protected/add-review", reviewInput, {
      headers: authHeader(),
    })
    .catch((error) => {
      throw error;
    });
};

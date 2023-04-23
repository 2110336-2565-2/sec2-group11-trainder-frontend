import axios from "axios";
import authHeader from "./auth-header";
import FormData from "form-data";

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
  usertype: string;
  lat: number;
  lng: number;
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

export type UserDetails = {
  firstname: string;
  lastname: string;
  role: string;
}

export const getNameAndRole = (username: string) => {
  return axios.get(API_URL + "/protected/get-name-and-role",
    {
      headers: authHeader(), params: { username: username }
    }).then((response) => {
      const user = response.data.result as UserDetails;
      return user;
    })
}

export type UpdateData = {
  userType: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  citizenId: string;
  gender: string;
  phoneNumber: string;
  address: string;
};
export const updateProfile = (updateData: UpdateData) => {
  return axios
    .post(API_URL + "/protected/update-profile", updateData, {
      headers: authHeader(),
    })
    .catch((error) => {
      throw error;
    });
};

export const getProfileImage = (username: string) => {
  return axios.get(
    API_URL + "/protected/image",
    { headers: authHeader(), params: { username: username } }
  ).then(async (response) => {
    const imgBase64 = response.data.message;
    const imageUrl = 'data:image/jpeg;base64,' + imgBase64;
    let file = null;
    await fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        file = new File([blob], "File name", { type: "image/jpeg" });
      })
    return file;
  }).catch((error) => {
    if (error.response && error.response.status === 500) {
      return null;
    }
    else {
      throw error
    }
  })
}

export const uploadProfileImage = (image: File) => {
  let data = new FormData();
  data.append('image', image, 'profile.png');

  return axios.post(
    API_URL + "/protected/image",
    data,
    { headers: authHeader() }
  ).catch((error) => {
    throw error;
  })
}
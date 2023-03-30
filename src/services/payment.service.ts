import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export const createPayment = (bookingID: string, token: string) => {
  return axios
    .post(
      API_URL + "/protected/create-payment",
      { bookingID: bookingID, token: token },
      {
        headers: authHeader(),
      }
    )
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      }
      throw error;
    });
};

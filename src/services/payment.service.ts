import axios from "axios";
import authHeader from "./auth-header";
import { Booking } from "./booking.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export type RequestPayoutInput = {
  bookingID: string;
  bank: string;
  accountName: string;
  accountNumber: string;
}

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

export const getPaymentNeedPayout = () => {
  return axios.get(
    API_URL + "/protected/payment-need-payouts",
    { headers: authHeader() }
  ).then((response) => {
    const bookings = response.data.bookings as Booking[] ?? [];
    if (bookings) {
      bookings.map((data) => {
        data.startDateTime = new Date(data.startDateTime);
        data.endDateTime = new Date(data.endDateTime);
      });
    }
    return bookings;
  })
}

export const payout = (bookingID: string) => {
  return axios.post(
    API_URL + "/protected/payout",
    { bookingID: bookingID },
    { headers: authHeader() }
  ).catch((error) => {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  });
}

export const getPaymentList = () => {
  return axios.get(
    API_URL + "/protected/payment-list",
    { headers: authHeader() }
  ).then((response) => {
    const bookings = response.data.bookings as Booking[] ?? [];
    if (bookings) {
      bookings.map((data) => {
        data.startDateTime = new Date(data.startDateTime);
        data.endDateTime = new Date(data.endDateTime);
      });
    }
    return bookings;
  })
}

export const requestPayout = (data: RequestPayoutInput) => {
  return axios.post(
    API_URL + "/protected/request-payout",
    data,
    { headers: authHeader() }
  ).catch((error) => {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  });
}
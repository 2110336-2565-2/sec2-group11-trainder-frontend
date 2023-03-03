import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export type BookingInput = {
  date: string;
  endTime: string;
  startTime: string;
  trainer: string;
};
export type BookingList = {
  _id: string;
  endDateTime: Date;
  startDateTime: Date;
  status: string;
  trainer: string;
  trainee: string;
};

export const updateBooking = (updateBookingInfo: {
  bookingId: string;
  paymentStatus: string;
  status: string;
}) => {
  return axios
    .post(API_URL + "/protected/update-booking", updateBookingInfo, {
      headers: authHeader(),
    })
    .catch((err) => {
      throw err;
    });
};
export const deleteBooking = (deleteBookingInfo: { bookingId: string }) => {
  return axios
    .delete(API_URL + "/protected/delete-booking", {
      headers: authHeader(),
      data: deleteBookingInfo,
    })
    .catch((err) => {
      throw err;
    });
};
export const getBooking = () => {
  return axios
    .get(API_URL + "/protected/bookings", { headers: authHeader() })
    .then((response) => {
      if (response.data.bookings === undefined) {
        return [];
      } else {
        let booking = response.data.bookings as [BookingList];
        booking.map((elem) => {
          elem.startDateTime = new Date(elem.startDateTime);
          elem.endDateTime = new Date(elem.endDateTime);
        });
        return booking;
      }
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
};
export const createBooking = (bookingInput: BookingInput) => {
  return axios
    .post(API_URL + "/protected/create-booking", bookingInput, {
      headers: authHeader(),
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      }
      throw error;
    });
};

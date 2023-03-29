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
  trainerFirstName: string;
  trainerLastName: string;
  trainee: string;
  traineeFirstName: string;
  traineeLastName: string;
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
export const getBookings = () => {
  return axios
    .get(API_URL + "/protected/bookings", { headers: authHeader() })
    .then((response) => {
      if (response.data.bookings === undefined) {
        return Object.create(Array());
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

export const getSpecificDateBookings = async (date: string) => {
  return axios
    .get(API_URL + '/protected/today-event', { headers: authHeader(), params: { date: date } })
    .then((response) => {
      let bookings: BookingList[] = [];
      if (response.data.bookings) {
        bookings = response.data.bookings;
        bookings.map((booking) => {
          booking.startDateTime = new Date(booking.startDateTime);
          booking.endDateTime = new Date(booking.endDateTime);
        });
      }
      return bookings;
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
}
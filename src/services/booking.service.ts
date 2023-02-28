import axios from "axios"
import authHeader from "./auth-header";

const API_URL = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "";

export type BookingInput = {
    date: string,
    endTime: string,
    startTime: string,
    trainer: string
}

export const createBooking = (bookingInput: BookingInput) => {
    return axios.post(API_URL + '/protected/create-booking', bookingInput, { headers: authHeader() }).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        throw error;
    });
}
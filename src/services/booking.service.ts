import axios from "axios"
import authHeader from "./auth-header";
import {Simulate} from "react-dom/test-utils";


const API_URL = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "";

export type BookingInput = {
    date: string,
    endTime: string,
    startTime: string,
    trainer: string
}
export type BookingList = {
    _id: string,
    endDateTime: Date,
    startDateTime: Date,
    status: string,
    trainer: string
}
export const getBooking = () => {
    return axios.get(API_URL + '/protected/bookings', {headers: authHeader()}).then(
        (response) => {
            let booking = response.data.bookings as [BookingList]
            booking.map((elem) => {
                elem.startDateTime = new Date(elem.startDateTime)
                elem.endDateTime = new Date(elem.endDateTime)
            })
            return booking
        }
    ).catch((error) => {
        if (error) {
            throw error;
        }
    })
}
export const createBooking = (bookingInput: BookingInput) => {
    return axios.post(API_URL + '/protected/create-booking', bookingInput, {headers: authHeader()}).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        throw error;
    });
}
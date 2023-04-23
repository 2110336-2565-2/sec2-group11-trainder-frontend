import axios from "axios";
import authHeader from "./auth-header";
import { getProfileImage } from "./user.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "";

export type Message = {
    content: string,
    createdAt: Date,
    sender: string,
}

export type ChatList = {
    audience: string,
    message: Message
    image: File | null,
}

export type RoomDetails = {
    id: string,
    trainer: string,
    trainee: string
}

export const getRoomId = async (audience: string) => {
    return axios
        .get(API_URL + "/protected/get-room-id", {
            headers: authHeader(),
            params: { audience: audience }
        }).then((response) => {
            const roomId = response.data.roomID;
            return roomId;
        })
}

export const createRoom = async (room: RoomDetails) => {
    return axios
        .post(API_URL + "/protected/create-room", room, {
            headers: authHeader(),
        })
        .catch((err) => {
            throw err;
        });
}

export const getSpecificRoom = (trainee: string, trainer: string) => {
    return axios
        .get(API_URL + "/protected/get-rooms", {
            headers: authHeader(),
        })
        .then((response) => {
            const rooms = response.data.rooms as RoomDetails[]
            const room = rooms.find((r) => {
                return r.trainee === trainee && r.trainer === trainer;
            });
            return room;
        })
        .catch((error) => {
            throw error;
        });
};

export const getAllChats = async () => {
    return axios
        .get(API_URL + "/protected/get-all-chats", {
            headers: authHeader(),
        })
        .then(async (response) => {
            const allChat = response.data.allChat as ChatList[];
            if (allChat) {
                await Promise.all(allChat.map(async (chat) => {
                    chat.message.createdAt = new Date(chat.message.createdAt);
                    await getProfileImage(chat.audience).then((data) => {
                        chat.image = data;
                    })
                }))
            }
            return allChat;
        })
}

export const getPastMessages = async (audience: string) => {
    return axios
        .get(API_URL + "/protected/get-past-chat", {
            headers: authHeader(),
            params: { audience: audience }
        })
        .then((response) => {
            const messages = response.data.chatMessages as Message[];
            if (messages) {
                messages.map((m) => {
                    m.createdAt = new Date(m.createdAt);
                })
            }
            return messages;
        })
}
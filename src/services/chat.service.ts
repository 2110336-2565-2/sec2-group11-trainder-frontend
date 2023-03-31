import axios from "axios";
import authHeader from "./auth-header";

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
}

export const getAllChats = async () => {
    return axios
        .get(API_URL + "/protected/get-all-chats", {
            headers: authHeader(),
        })
        .then((response) => {
            const allChat = response.data.allChat as ChatList[];
            if (allChat) {
                allChat.map((chat) => {
                    chat.message.createdAt = new Date(chat.message.createdAt);
                })
            }
            return allChat;
        })
}
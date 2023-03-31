import { ChatList } from "@/services/chat.service";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

const Sidebar = (props: { allChats: ChatList[] }) => {
  const [selectedChat, setSelectedChat] = useState("");

  const getMessageTime = (time: Date) => {
    const now = new Date();
    const isToday =
      time.getUTCFullYear() === now.getUTCFullYear() &&
      time.getUTCMonth() === now.getUTCMonth() &&
      time.getUTCDate() === now.getUTCDate();
    const messageTime = dayjs(time.toISOString().slice(0, -1));
    const displayTime = isToday
      ? messageTime.format("HH:mm")
      : messageTime.format("MMM DD, YYYY");
    return displayTime;
  };

  return (
    <>
      {props.allChats &&
        props.allChats.map((chat, index) => {
          const isSelected = selectedChat === chat.audience;
          return (
            <div
              className={`flex flex-row py-3 w-full items-center ${
                isSelected ? "bg-gray-light" : ""
              } hover:cursor-pointer hover:bg-gray-100`}
              onClick={() => setSelectedChat(chat.audience)}
              key={index}
            >
              <div className="ml-6 md:ml-8 rounded-full overflow-hidden">
                <Image
                  src="/default_profile.jpg"
                  alt=""
                  width={90}
                  height={90}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="h-full w-full flex-col ml-2 md:ml-5">
                <p className="text-base md:text-lg m-1">{chat.audience}</p>
                <p className="text-xs md:text-sm text-gray m-1">
                  <span className="text-black">
                    {getMessageTime(chat.message.createdAt)}
                  </span>
                  &nbsp;{chat.message.content}
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Sidebar;

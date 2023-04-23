import { ChatList } from "@/services/chat.service";
import { formatFromDate } from "@/utils/date";
import Image from "next/image";

type SidebarProps = {
  allChats: ChatList[];
  selectedChat: string;
  setSelectedChat: (audience: string) => any;
};
const Sidebar = (props: SidebarProps) => {
  const getMessageTime = (time: Date) => {
    const now = new Date();
    const isToday =
      time.getUTCFullYear() === now.getUTCFullYear() &&
      time.getUTCMonth() === now.getUTCMonth() &&
      time.getUTCDate() === now.getUTCDate();
    const messageTime = formatFromDate(time);
    const displayTime = isToday ? messageTime[1] : messageTime[0];
    return displayTime;
  };

  return (
    <>
      {props.allChats &&
        props.allChats.map((chat, index) => {
          const isSelected = props.selectedChat === chat.audience;
          return (
            <div
              className={`flex flex-row py-3 w-full items-center ${
                isSelected ? "bg-gray-light" : ""
              } hover:cursor-pointer hover:bg-gray-light hover:bg-opacity-25`}
              onClick={() => props.setSelectedChat(chat.audience)}
              key={index}
            >
              <div className="ml-6 md:ml-8">
                <div className="h-20 w-20">
                  <div className="h-full w-full relative rounded-full overflow-hidden">
                    <Image
                      src={
                        chat.image
                          ? URL.createObjectURL(chat.image)
                          : "/default_profile.jpg"
                      }
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
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

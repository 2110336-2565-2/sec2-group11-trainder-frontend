import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const ChatBox = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleChatBoxClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      className={`flex flex-row h-[15%] w-full items-center ${
        isClicked ? "bg-gray-300" : "hover:bg-gray-200"
      }`}
      onClick={handleChatBoxClick}
    >
      <div className="ml-[5%] rounded-full overflow-hidden">
        <Image
          src="/default_profile.jpg"
          alt=""
          width={90}
          height={90}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="h-full w-full flex-col mt-[2%] ml-[5%]">
        <p className="text-xl m-[2%]">Name Surname</p>
        <p className="text-gray m-[2%]">
          message : last sentence of the chat
        </p>
      </div>
    </div>
  );
};

const Chat = () => {
  const handleAddChatClick = () => {
    // Implement the logic to add a new chat
  };

  return (
    <main className="w-full h-screen pt-20 flex flex-col overflow-hidden ">
      <div className="flex flex-col w-2/5 h-screen bg-white">
        <div className="flex flex-row h-[10%] w-full justify-between">
          <p className="text-xl md:text-3xl font-bold ml-[2%] mt-[2%]">
            Chats
          </p>
          <button onClick={handleAddChatClick}>
            <PlusIcon className="w-10 m-[2%]" />
          </button>
        </div>
        <div className="h-full w-full overflow-y-scroll">
          <ChatBox />
          <ChatBox />
          <ChatBox />
          <ChatBox />
          <ChatBox />
          <ChatBox />
          <ChatBox />
          <ChatBox />
        </div>
      </div>
    </main>
  );
};

export default Chat;

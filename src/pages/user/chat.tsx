import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const ChatBox = (props: { name: string; message: string }) => {
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
        <p className="text-xl m-[2%]">{props.name}</p>
        <p className="text-gray m-[2%]">message : {props.message}</p>
      </div>
    </div>
  );
};

const Chat = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddChatClick = () => {
    setShowModal(true);
  };

  const handleCloseModalClick = () => {
    setShowModal(false);
  };

  const handleTrainerSelectModalClick = () => {
    setShowModal(false);
  };

  const TrainerListBox = (props: { name: string }) => {
    return (
      <button onClick={handleTrainerSelectModalClick}>
        <div className="text-xl p-[2%] text-gray hover:bg-gray-200">
          {props.name}
        </div>
      </button>
    );
  };

  return (
    <main className="w-full h-screen pt-20 flex flex-col overflow-hidden ">
      <div className="flex flex-row">
        <div className="flex flex-col w-2/5 h-screen bg-white">
          <div className="flex flex-row h-[10%] w-full justify-between">
            <p className="text-xl md:text-3xl font-bold ml-[2%] mt-[2%]">
              Chats
            </p>
            <button onClick={handleAddChatClick} className="m-[2%]">
              <PlusIcon className="w-10" />
            </button>
          </div>
          <div className="h-full w-full overflow-y-scroll">
            <ChatBox name="Lalisa Manoban" message="last message" />
            <ChatBox name="Jennie Kim" message="last message" />
            <ChatBox name="Jisoo Kim" message="last message" />
            <ChatBox name="Chaeyong Pak" message="last message" />
          </div>
        </div>
        <div className="flex flex-col w-3/5 h-screen bg-gray-100 relative">
          
            <div className="pt-5 flex flex-row items-center">
              <div className=" ml-[1%] rounded-full overflow-hidden">
                <Image
                  src="/default_profile.jpg"
                  alt=""
                  width={50}
                  height={50}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="px-2">Lalisa Manoban</p>
            </div>
          
          <div className="absolute bottom-1/4 w-full">
            <div className="p-5 flex flex-row items-end">
              <div className="bg-[#5D86BC] h-8 rounded-lg p-1 drop-shadow-2xl">
                <p>Some Chat1</p>
              </div>
              <p className="px-1 text-xs">14.50</p>
            </div>
            <div className="grid justify-items-end">
              <div className="p-5 flex flex-row items-end">
                <p className="px-1 text-xs">15.00</p>
                <div className="bg-white h-8 rounded-lg p-1 drop-shadow-2xl">
                  <p>Some Chat2</p>
                </div>
              </div>
            </div>

            <div className="grid justify-items-end">
              <div className="p-5 flex flex-row items-end">
                <p className="px-1 text-xs">15.00</p>
                <div className="bg-white h-8 rounded-lg p-1 drop-shadow-2xl">
                  <p>Some Chat3</p>
                </div>
              </div>
            </div>
            <div className="p-5 flex flex-row items-end ">
              <div className="bg-[#5D86BC] h-8 rounded-lg p-1 drop-shadow-2xl">
                <p>Some Chat4</p>
              </div>
              <p className="px-1 text-xs">15.05</p>
            </div>
          </div>
          <div className="p-2 bg-white absolute bottom-20 w-full ">
            <input
              className="p-2 rounded-3xl w-full border bg-gray-300  "
              type="text"
              placeholder="Aa"
            />
          </div>
          </div>
        </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 z-50 flex flex-row justify-center items-center">
          <div className="flex flex-col bg-white p-8 rounded-md w-1/2 h-1/2">
            <div className=" flex flex-row justify-between">
              <p className="text-xl">Add new chat</p>
              <button onClick={handleCloseModalClick} className="w-5 h-5">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col overflow-y-scroll">
              <TrainerListBox name="Soo JeeKim" />
              <TrainerListBox name="Salisa Slytherin" />
              <TrainerListBox name="Soo JeeKim" />
              <TrainerListBox name="Salisa Slytherin" />
              <TrainerListBox name="Soo JeeKim" />
              <TrainerListBox name="Salisa Slytherin" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Chat;

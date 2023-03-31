import { useEffect, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Modal } from "@/components/common/modal";
import {
  ChatList,
  getAllChats,
  getPastMessages,
  Message,
} from "@/services/chat.service";
import Sidebar from "@/components/chat/sidebar";
import ChatBox from "@/components/chat/chatbox";

const Chat = () => {
  const [showModal, setShowModal] = useState(false);
  const [allChats, setAllChats] = useState<ChatList[]>([]);
  const [selectedChat, setSelectedChat] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    getAllChats().then((chat) => {
      setAllChats(chat);
    });
  }, []);

  useEffect(() => {
    getPastMessages(selectedChat).then((data) => {
      setMessages(data);
    });
  }, [selectedChat]);

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
    <main className="w-full h-full min-h-screen flex flex-col overflow-hidden">
      <div className="flex">
        <div className="flex flex-col flex-1 w-1/3 pt-20 bg-white">
          <div className="flex flex-row w-full px-6 justify-between">
            <p className="text-2xl md:text-3xl font-bold">Chats</p>
            <button onClick={handleAddChatClick}>
              <PlusIcon className="h-8 w-8" strokeWidth={2} />
            </button>
          </div>
          <div className="h-full w-full mt-4 overflow-auto">
            <Sidebar
              allChats={allChats}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
          </div>
        </div>
        {selectedChat ? (
          <ChatBox messages={messages} audience={selectedChat} />
        ) : (
          <div className="w-2/3 h-screen"></div>
        )}
      </div>

      <Modal
        isShow={showModal}
        onClose={() => setShowModal(false)}
        width="w-1/2"
      >
        <div className="flex flex-col bg-white p-8 rounded-md h-1/2">
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
      </Modal>
    </main>
  );
};

export default Chat;

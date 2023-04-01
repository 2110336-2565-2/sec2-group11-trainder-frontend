import { KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  PaperAirplaneIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Modal } from "@/components/common/modal";
import {
  ChatList,
  createRoom,
  getAllChats,
  getPastMessages,
  getRoomId,
  getSpecificRoom,
  Message,
} from "@/services/chat.service";
import Sidebar from "@/components/chat/sidebar";
import ChatBox from "@/components/chat/chatbox";
import { getCurrentUser } from "@/services/auth.service";

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL
  ? process.env.NEXT_PUBLIC_WEBSOCKET_URL
  : "";

type WSMessage = {
  content: string;
  roomId: string;
  username: string;
};

const Chat = () => {
  const [showModal, setShowModal] = useState(false);
  const [allChats, setAllChats] = useState<ChatList[]>([]);
  const [selectedChat, setSelectedChat] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket>();
  const [isSocketClosed, setIsSocketClosed] = useState<boolean>(true);
  const [update, setUpdate] = useState<boolean>(true);

  const username = getCurrentUser().username;
  const text = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (update) {
      getAllChats().then((chat) => {
        setAllChats(chat);
        setUpdate(false);
      });
    }
  }, [update]);

  useEffect(() => {
    if (selectedChat) {
      getSpecificRoom(selectedChat, username).then((room) => {
        if (room) {
          const ws = new WebSocket(
            `${WEBSOCKET_URL}/join-room/${room.id}?username=${username}`
          );
          setSocket(ws);
        } else {
          getRoomId(selectedChat).then((id) => {
            createRoom({
              id: id,
              trainer: username,
              trainee: selectedChat,
            }).then(() => {
              const ws = new WebSocket(
                `${WEBSOCKET_URL}/join-room/${id}?username=${username}`
              );
              setSocket(ws);
            });
          });
        }
        setIsSocketClosed(false);
      });
    }
    getPastMessages(selectedChat).then((data) => {
      setMessages(data);
    });
  }, [selectedChat, username]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.onmessage = (message) => {
        const m: WSMessage = JSON.parse(message.data);
        if (
          m.content !== "A new user has joined the room" &&
          m.content !== "user left the chat"
        ) {
          setMessages([
            ...messages,
            { content: m.content, createdAt: new Date(), sender: m.username },
          ]);
          setUpdate(true);
        }
      };
      socket.onclose = () => {
        setIsSocketClosed(true);
      };
      socket.onerror = () => {};
      socket.onopen = () => {};
    }
  }, [messages, socket]);

  const sendMessage = () => {
    if (!text.current?.value) return;
    if (isSocketClosed) {
    } else {
      if (socket !== undefined) {
        socket.send(text.current.value);
        text.current.value = "";
      }
    }
  };

  const handleEnterMessage = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const TrainerListBox = (props: { name: string }) => {
    return (
      <button onClick={() => setShowModal(false)}>
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
            <button onClick={() => setShowModal(true)}>
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
          <div className="flex flex-col w-2/3 h-screen relative">
            <div className="overflow-auto mb-14">
              <ChatBox messages={messages} audience={selectedChat} />
            </div>
            <div className="p-2 bg-white w-2/3 flex items-center space-x-4 fixed bottom-0">
              <input
                className="p-2 rounded-3xl w-full border bg-[#F5F2F2]"
                type="text"
                placeholder="Aa"
                ref={text}
                onKeyDown={handleEnterMessage}
              />
              <button onClick={sendMessage}>
                <PaperAirplaneIcon className="h-8 w-8" strokeWidth={2} />
              </button>
            </div>
          </div>
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
            <button onClick={() => setShowModal(false)} className="w-5 h-5">
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

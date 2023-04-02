import React, {
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
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
import { useRouter } from "next/router";
const WEBSOCKET_URL = process.env.NEXT_PUBLIC_API_URL
  ? "wss:" + process.env.NEXT_PUBLIC_API_URL.slice(6)
  : "";

type WSMessage = {
  content: string;
  roomId: string;
  username: string;
};

const Chat = () => {
  const [allChats, setAllChats] = useState<ChatList[]>([]);
  const [selectedChat, setSelectedChat] = useState("");
  const [keepAlive, setKeepAlive] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket>();
  const [update, setUpdate] = useState<boolean>(true);
  const text = useRef<HTMLInputElement>(null);

  const user = getCurrentUser();
  const router = useRouter();

  const joinRoom = useCallback((roomId: string, username: string) => {
    const ws = new WebSocket(
      `${WEBSOCKET_URL}/join-room/${roomId}?username=${username}`
    );
    console.log(ws);
    setSocket(ws);
    setKeepAlive(true);
  }, []);

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
      setKeepAlive(false);
      const trainer =
        user.usertype === "Trainer" ? user.username : selectedChat;
      const trainee =
        user.usertype === "Trainee" ? user.username : selectedChat;
      getSpecificRoom(trainee, trainer).then((room) => {
        if (room) {
          joinRoom(room.id, user.username);
        } else {
          getRoomId(selectedChat).then((id) => {
            createRoom({
              id: id,
              trainer: trainer,
              trainee: trainee,
            }).then(() => {
              joinRoom(id, user.username);
            });
          });
        }
      });
    }
    getPastMessages(selectedChat).then((data) => {
      setMessages(data);
    });
  }, [joinRoom, selectedChat, user.username, user.usertype]);

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
        if (router.asPath === "/user/chat" && keepAlive) {
          const trainer =
            user.usertype === "Trainer" ? user.username : selectedChat;
          const trainee =
            user.usertype === "Trainee" ? user.username : selectedChat;
          getSpecificRoom(trainee, trainer).then((room) => {
            if (room) {
              joinRoom(room.id, user.username);
            }
          });
        }
      };
      socket.onerror = () => {};
      socket.onopen = () => {};

      if (!keepAlive) {
        socket.close();
      }
    }
  }, [
    joinRoom,
    keepAlive,
    messages,
    router.asPath,
    selectedChat,
    socket,
    user.username,
    user.usertype,
  ]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!text.current?.value) return;
    if (socket !== undefined) {
      if (socket.readyState === socket.OPEN) {
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
  const messageEnd = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <main className="w-full h-full min-h-screen flex flex-col overflow-hidden">
      <div className="flex">
        <div className="flex flex-col flex-1 w-1/3 pt-20 bg-white">
          <div className="flex flex-row w-full px-6 justify-between">
            <p className="text-2xl md:text-3xl font-bold">Chats</p>
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
              <div
                style={{ float: "left", clear: "both" }}
                ref={messageEnd}
              ></div>
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
    </main>
  );
};

export default Chat;

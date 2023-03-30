import { useState } from "react";
import { PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";
import { Modal } from "@/components/common/modal";
import Image from "next/image";

const Chat = () => {
  const [showModal, setShowModal] = useState(false);

  const [selectedChat, setSelectedChat] = useState("");

  const ChatBox = (props:{name:string,message:string}) => {

    const isSelected:boolean = selectedChat===props.name; //may be change to unique value later
    const handleChatBoxClick = () => {
      setSelectedChat(props.name);
    };

    return (
      <div
        className={`flex flex-row h-[15%] mt-[2%] w-full items-center ${
          isSelected ? "bg-gray-300" : "hover:bg-gray-200"
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
          <p className="text-gray m-[2%]">
            message : {props.message}
          </p>
        </div>
      </div>
    );
  };
  

  const handleAddChatClick = () => {
    setShowModal(true);
  };

  const handleCloseModalClick = () => {
    setShowModal(false);
  };

  const handleTrainerSelectModalClick = () => {
    setShowModal(false);
  };

  const TrainerListBox =(props:{name:string}) => {
    return(
      <button onClick={handleTrainerSelectModalClick}>
        <div className="text-xl p-[2%] text-gray hover:bg-gray-200">
          {props.name}
        </div>
      </button>
    )
  }

  return (
    <main className="w-full h-screen pt-20 flex flex-col overflow-hidden ">
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
        <ChatBox name="Lalisa Manobal" message="last message" />
        <ChatBox name="Jennie Kim" message="last message" />
        <ChatBox name="Jisoo Kim" message="last message" />
        <ChatBox name="Chaeyoung Park" message="last message" />

        </div>
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
                <XMarkIcon className="w-5 h-5"/>
              </button>
            </div>
            <div className="flex flex-col overflow-y-scroll">
              <TrainerListBox name="Soo JeeKim"/>
              <TrainerListBox name="Salisa Slytherin"/>
              <TrainerListBox name="Soo JeeKim"/>
              <TrainerListBox name="Salisa Slytherin"/>
              <TrainerListBox name="Soo JeeKim"/>
              <TrainerListBox name="Salisa Slytherin"/>
            </div> 
          </div>
  
      </Modal>
      
    </main>
  );
};

export default Chat;

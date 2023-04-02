import { Message } from "@/services/chat.service";
import { formatFromDate } from "@/utils/date";
import Image from "next/image";

type ChatProps = {
  messages: Message[];
  audience: string;
};

const ChatBox = (props: ChatProps) => {
  const UserMessage = (props: { message: string; time: string }) => {
    return (
      <div className="flex px-3 py-2 items-end justify-end ">
        <p className="px-2 text-xs">{props.time}</p>
        <div className="bg-blue rounded-full px-4 py-1 shadow-lg text-white">
          {props.message}
        </div>
      </div>
    );
  };

  const ContactPersonMessage = (props: { message: string; time: string }) => {
    return (
      <div className="flex px-3 py-2 items-end">
        <div className="bg-white rounded-full px-4 py-1 shadow-lg">
          <p>{props.message}</p>
        </div>
        <p className="px-2 text-xs">{props.time}</p>
      </div>
    );
  };

  let date = "";

  return (
    <div className="flex flex-col flex-1 relative">
      <div className="px-5 pt-20 pb-2 flex flex-row items-center w-full bg-backgroundColor fixed">
        <div className="rounded-full overflow-hidden">
          <Image
            src="/default_profile.jpg"
            alt=""
            width={50}
            height={50}
            style={{ objectFit: "cover" }}
          />
        </div>
        <p className="px-2">{props.audience}</p>
      </div>

      <div className="w-full flex flex-col flex-1 mt-36 overflow-auto">
        {props.messages &&
          props.messages.map((message, index) => {
            const [messageDate, messageTime] = formatFromDate(
              message.createdAt,
              false
            );
            const showDate = messageDate !== date;
            if (showDate) {
              date = messageDate;
            }
            return (
              <div key={index}>
                {showDate ? (
                  <div className="flex justify-center text-sm text-gray-dark my-2">
                    <p className="bg-gray bg-opacity-40 px-2 rounded-full">{messageDate}</p>
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  {message.sender === props.audience ? (
                    <ContactPersonMessage
                      message={message.content}
                      time={messageTime}
                    />
                  ) : (
                    <UserMessage message={message.content} time={messageTime} />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChatBox;

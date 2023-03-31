import Image from "next/image";

const ChatBox = () => {
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

  return (
    <div className="flex flex-col w-2/3 h-screen relative">
      <div className="px-5 pt-20 pb-3 flex flex-row items-center bg-backgroundColor">
        <div className="rounded-full overflow-hidden">
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

      <div className="w-full overflow-auto flex flex-col flex-1">
        <ContactPersonMessage message="Hello" time="14.50" />
        <UserMessage message="..." time="15.00" />
        <UserMessage message="Some Chat ..." time="15.00" />
        <ContactPersonMessage
          message="This is very very long text"
          time="15.05"
        />
        <ContactPersonMessage message="This is short text" time="15.06" />
      </div>
      <div className="p-2 bg-white w-full">
        <input
          className="p-2 rounded-3xl w-full border bg-[#F5F2F2]"
          type="text"
          placeholder="Aa"
        />
      </div>
    </div>
  );
};

export default ChatBox;

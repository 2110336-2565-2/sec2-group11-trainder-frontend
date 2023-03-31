import Image from "next/image";

const ChatBox = () => {
  const UserMessage = (props: { message: string; time: string }) => {
    return (
      <div className="grid justify-items-end">
        <div className="p-5 flex flex-row items-end">
          <p className="px-1 text-xs">{props.time}</p>
          <div className="bg-blue h-8 rounded-xl p-1 drop-shadow-2xl">
            <p>{props.message}</p>
          </div>
        </div>
      </div>
    );
  };

  const ContactPersonMessage = (props: { message: string; time: string }) => {
    return (
      <div className="p-5 flex flex-row items-end">
        <div className="bg-white h-8 rounded-xl p-1 drop-shadow-2xl">
          <p>{props.message}</p>
        </div>
        <p className="px-1 text-xs">{props.time}</p>
      </div>
    );
  };

  return (
    <main className="w-full h-screen pt-16 flex flex-col overflow-hidden">
      <div className="flex flex-row">
        <div className="flex flex-col w-2/5 h-screen bg-white"></div>
        <div className="flex flex-col w-3/5 h-screen relative">
          <div className="px-5 pt-8 flex flex-row items-center">
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

          <div className="absolute bottom-12 w-full overflow-auto">
            <ContactPersonMessage message="Hello" time="14.50" />
            <UserMessage message="..." time="15.00" />
            <UserMessage message="Some Chat ..." time="15.00" />
            <ContactPersonMessage
              message="This is very very long text"
              time="15.05"
            />
            <ContactPersonMessage message="This is short text" time="15.06" />
          </div>
          <div className="p-2 bg-white absolute bottom-14 w-full ">
            <input
              className="p-2 rounded-3xl w-full border bg-[#F5F2F2]"
              type="text"
              placeholder="Aa"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatBox;

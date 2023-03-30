import Image from "next/image";

const Chat = () => {

  return (
    <main className="w-full h-screen pt-20 flex flex-col overflow-hidden ">
      <div className="flex flex-row">
        <div className="flex flex-col w-2/5 h-screen bg-white">
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
                <p>Hello</p>
              </div>
              <p className="px-1 text-xs">14.50</p>
            </div>
            <div className="grid justify-items-end">
              <div className="p-5 flex flex-row items-end">
                <p className="px-1 text-xs">15.00</p>
                <div className="bg-white h-8 rounded-lg p-1 drop-shadow-2xl">
                  <p>...</p>
                </div>
              </div>
            </div>

            <div className="grid justify-items-end">
              <div className="p-5 flex flex-row items-end">
                <p className="px-1 text-xs">15.00</p>
                <div className="bg-white h-8 rounded-lg p-1 drop-shadow-2xl">
                  <p>Some Chat ...</p>
                </div>
              </div>
            </div>
            <div className="p-5 flex flex-row items-end ">
              <div className="bg-[#5D86BC] h-8 rounded-lg p-1 drop-shadow-2xl">
                <p>This is very very long text</p>
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

    </main>
  );
};

export default Chat;

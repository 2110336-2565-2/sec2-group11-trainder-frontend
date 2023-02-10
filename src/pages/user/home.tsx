import { NavBar } from "@/components/navbar";
import { PlusIcon } from "@heroicons/react/24/outline";

const Home = () => {
  return (
    <main className="h-screen bg-backgroundColor">
      <NavBar />
      <div className="w-full h-2/3 p-5 flex items-center justify-center"></div>
      <div className="bg-gray h-1 mx-10 rounded-full"></div>
      <div className="flex m-5 items-center">
        <h1 className="text-xl px-10 py-2">Booking new training</h1>
        <a
          className="flex w-11 h-11 items-center justify-center bg-gray-dark text-white rounded-full shadow-xl hover:cursor-pointer hover:bg-pink"
          href="/user/booking"
        >
          <PlusIcon className="h-6 w-6" strokeWidth={4} />
        </a>
      </div>
    </main>
  );
};

export default Home;
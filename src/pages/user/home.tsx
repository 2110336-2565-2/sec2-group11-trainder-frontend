import Calendar from "@/components/calendar";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Home = () => {
  return (
    <main className="h-screen bg-backgroundColor">
      <Calendar />
      <div className="bg-gray h-1 mx-10 rounded-full"></div>
      <div className="flex m-5 items-center">
        <h1 className="text-xl px-10 py-2">Booking new training</h1>
        <Link
          className="flex w-11 h-11 items-center justify-center bg-gray-dark text-white rounded-full shadow-xl hover:cursor-pointer hover:bg-pink"
          href="/user/booking"
        >
          <PlusIcon className="h-6 w-6" strokeWidth={4} />
        </Link>
      </div>
    </main>
  );
};

export default Home;

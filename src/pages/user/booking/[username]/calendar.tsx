import { BackButton } from "@/components/backbutton";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";

const Calendar = () => {
  const router = useRouter();
  const { username, firstname, lastname } = router.query;
  const now = dayjs();
  const [selectedDate, setSelectedDate] = useState(now);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <main className="w-full min-h-screen h-full pt-20 px-6 pb-6 flex">
      <div className="flex flex-grow flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 h-2/3 md:h-full bg-backgroundColor p-5">
          <div className="flex items-center text-2xl md:text-3xl font-bold">
            <BackButton href={"/user/booking/" + username} mx="mx-4" />
            {firstname} {lastname}
          </div>
        </div>
        <div className="w-full md:w-1/3 h-1/3 md:h-full overflow-y-auto bg-backgroundColor p-5">
          <div className="text-xl">
            {selectedDate.format("ddd, MMMM D, YYYY")}
          </div>
          
        </div>
      </div>
    </main>
  );
};

export default Calendar;

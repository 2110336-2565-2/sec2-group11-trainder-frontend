import { BackButton } from "@/components/backbutton";
import { Button } from "@/components/button";
import { generateDate } from "@/util/calendar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";

const Calendar = () => {
  const router = useRouter();
  const { username, firstname, lastname } = router.query;
  const now = dayjs();
  const [selectedDate, setSelectedDate] = useState(now);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const bookingCalendar = () => {
    return (
      <div className="px-5 h-full">
        <div className="flex w-full items-center justify-center my-2 font-bold text-xl sm:text-2xl">
          <a
            className="hover:cursor-pointer hover:bg-pink-light rounded-xl p-2"
            onClick={() =>
              setSelectedDate(
                selectedDate.set("month", selectedDate.month() - 1)
              )
            }
          >
            <ChevronLeftIcon className="h-6 w-6" strokeWidth={3} />
          </a>
          <div className="w-3/5 sm:w-2/5 text-center">
            {selectedDate.format("MMMM YYYY")}
          </div>
          <a
            className="hover:cursor-pointer hover:bg-pink-light rounded-xl p-2"
            onClick={() =>
              setSelectedDate(
                selectedDate.set("month", selectedDate.month() + 1)
              )
            }
          >
            <ChevronRightIcon className="h-6 w-6" strokeWidth={3} />
          </a>
        </div>

        <div className="grid grid-cols-7 gap-1 h-5/6">
          {days.map((day, index) => {
            return (
              <div
                className={`flex items-center justify-center text-lg sm:text-xl font-bold ${
                  day === "Sun" || day === "Sat"
                    ? "text-pink-dark"
                    : "text-black"
                }`}
                key={index}
              >
                {day}
              </div>
            );
          })}
          {generateDate(selectedDate.month(), selectedDate.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <a
                  key={index}
                  className={`flex items-center justify-center text-base sm:text-lg ${
                    currentMonth
                      ? selectedDate.date() === date.date()
                        ? "bg-pink-dark text-white"
                        : today
                        ? "bg-pink text-white"
                        : "bg-brown"
                      : "bg-gray-light text-gray"
                  } hover:cursor-pointer transition-all`}
                  onClick={() => {
                    setSelectedDate(date);
                  }}
                >
                  {date.date()}
                </a>
              );
            }
          )}
        </div>
      </div>
    );
  };

  const timeSlot = () => {
    return <div></div>;
  };

  return (
    <main className="w-full min-h-screen h-full pt-20 px-6 pb-6 flex">
      <div className="flex flex-grow flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 h-2/3 md:h-full flex flex-col bg-backgroundColor p-5">
          <div className="flex items-center text-2xl md:text-3xl font-bold">
            <BackButton href={"/user/booking/" + username} mx="mx-4" />
            {firstname} {lastname}
          </div>
          <div className="flex-1">{bookingCalendar()}</div>
        </div>
        <div className="w-full md:w-1/3 h-1/3 md:h-full bg-backgroundColor p-5 flex flex-col">
          <div className="text-xl mb-4">
            {selectedDate.format("ddd, MMMM D, YYYY")}
          </div>
          <div className="flex-1 overflow-y-auto mb-2">
            {selectedDate.isBefore(now.format("YYYY-MM-DD")) ? (
              <div className="flex items-center justify-center h-full bg-gray-light">
                Sorry, You cannot book the training in the past.
              </div>
            ) : (
              timeSlot()
            )}
          </div>
          <div className="flex justify-center">
            <Button name="Booking" width="w-3/5" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Calendar;

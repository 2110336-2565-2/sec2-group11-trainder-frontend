import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { generateDate, months } from "@/util/calendar";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import cn from "@/util/cn";
import {
  BookingList,
  getSpecificDateBookings,
} from "@/services/booking.service";
import { formatDateTime } from "@/util/date";

type CalendarProps = {
  usertype: string;
};

export default function Calendar(props: CalendarProps) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [bookings, setBookings] = useState<BookingList[]>([]);

  useEffect(() => {
    getSpecificDateBookings().then((data) => {
      if (data) {
        setBookings(data);
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-16 py-5 px-16 md:divide-x w-full md:flex-row justify-center md:justify-evenly items-center">
      <div className="w-96 h-100 ">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-10 items-center ">
            <ChevronLeftIcon
              className="h-6 w-6 cursor-pointer hover:scale-110 transition-all"
              strokeWidth={2}
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className=" cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <ChevronRightIcon
              className="w-6 h-6 hover:cursor-pointer hover:scale-105 transition-all"
              strokeWidth={2}
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 ">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
              >
                {day}
              </h1>
            );
          })}
        </div>
        <div className=" grid grid-cols-7 ">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                >
                  <h1
                    className={cn(
                      currentMonth ? "" : "text-gray-400",
                      today ? "bg-pink text-white" : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-pink-dark text-white"
                        : "",
                      "h-10 w-10 rounded-full grid place-content-center hover:bg-pink-dark hover:text-white transition-all cursor-pointer select-none"
                    )}
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="w-96 sm:px-5">
        <h1 className="font-semibold">
          Schedule for {selectDate.format("ddd, MMM DD YYYY")}
        </h1>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => {
            return (
              <div key={index} className="py-3 flex space-x-5">
                <ListBulletIcon className="h-6 w-6" />
                <div className="flex flex-col space-y-1">
                  <p>
                    {
                      formatDateTime(
                        booking.startDateTime,
                        booking.endDateTime
                      )[1]
                    }
                  </p>
                  {props.usertype === "Trainee" ? (
                    <p>
                      <span className="font-bold">Trainer:</span>{" "}
                      {booking.trainerFirstName} {booking.trainerLastName}
                    </p>
                  ) : (
                    <p>
                      <span className="font-bold">Trainee:</span>{" "}
                      {booking.traineeFirstName} {booking.traineeLastName}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400">
            There is currently no training appointment scheduled for today.
          </p>
        )}
      </div>
    </div>
  );
}

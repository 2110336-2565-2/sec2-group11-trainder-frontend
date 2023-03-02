import { useEffect, useState } from "react";
import {
  BookingInput,
  BookingList,
  getBooking,
} from "@/services/booking.service";
import { Button } from "@/components/button";

const Notification = () => {
  const [booking, setBooking] = useState<[BookingList]>();
  useEffect(() => {
    getBooking().then((data) => {
      console.log(data);
      setBooking(data!!);
    });
  }, []);
  const getTime = (booking: BookingList) => {
    let hourOfStart, hourOfEnd, minutesOfStart, minutesOfEnd;
    const startHour = booking.startDateTime.getUTCHours();
    const endHour = booking.endDateTime.getUTCHours();
    const startMinutes = booking.startDateTime.getMinutes();
    const endMinutes = booking.endDateTime.getMinutes();
    hourOfStart =
      startHour < 10 ? "0" + startHour.toString() : startHour.toString();
    hourOfEnd = endHour < 10 ? "0" + endHour.toString() : endHour.toString();
    minutesOfStart =
      startMinutes < 10
        ? "0" + startMinutes.toString()
        : startMinutes.toString();
    minutesOfEnd =
      endMinutes < 10 ? "0" + endMinutes.toString() : endMinutes.toString();
    return (
      <div className="text-gray-500">
        {hourOfStart}.{minutesOfStart} - {hourOfEnd}.{minutesOfEnd}
      </div>
    );
  };
  return (
    <>
      <main className="w-full h-screen flex bg-backgroundColor pt-24 h-full min-h-screen flex-col">
        <div className="text-3xl mx-8">Training session appointments</div>
        <div className="flex-col flex justify-center w-full">
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10 justify-center items-center p-5">
            {booking?.map((booking) => {
              return (
                <div
                  key={booking._id}
                  className="flex flex-col items-center text-center h-full break-words p-5 duration-300
                                    bg-white w-auto border-2 border-gray rounded-3xl drop-shadow-lg"
                >
                  <div className="text-xl font-500">{booking.trainer}</div>
                  <div className="text-gray-500">
                    {booking.startDateTime.getDate()}/
                    {booking.startDateTime.getMonth()}/
                    {booking.startDateTime.getFullYear()}
                  </div>
                  {getTime(booking)}
                  <div className="flex justify-between pt-5">
                    <div className="px-2">
                      <Button name="Confirm" onClick={() => {}}></Button>
                    </div>
                    <div className="px-2">
                      <Button name="Cancel" onClick={() => {}}></Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Notification;

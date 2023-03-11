import { useEffect, useState } from "react";
import {
  BookingList,
  deleteBooking,
  getBooking,
  updateBooking,
} from "@/services/booking.service";
import { Button } from "@/components/button";
import { getCurrentUserProfile, UserProfile } from "@/services/user.service";

const Notification = () => {
  const [booking, setBooking] = useState<[BookingList]>();
  const [profile, setProfile] = useState<UserProfile>();
  useEffect(() => {
    getCurrentUserProfile().then((data) => {
      setProfile(data);
    });
  }, []);
  useEffect(() => {
    getBooking().then((data) => {
      setBooking(data);
    });
  });
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
  const getName = (booking: BookingList) => {
    const name =
      profile?.usertype === "Trainee"
        ? booking.trainerFirstName + " " + booking.trainerLastName
        : booking.traineeFirstName + " " + booking.traineeLastName;
    return <div className="text-xl font-500">{name}</div>;
  };
  const getBottomRow = (booking: BookingList) => {
    if (booking.status === "confirm") {
      return <div className="pt-5 flex">Confirmed.</div>;
    }
    if (profile?.usertype === "Trainee") {
      return <div className="pt-5 flex">Waiting for confirmation.</div>;
    } else {
      return (
        <div className="flex justify-between pt-5">
          <div className="px-2">
            <Button
              name="Confirm"
              onClick={async () => {
                await updateBooking({
                  bookingId: booking._id,
                  paymentStatus: booking.status,
                  status: "confirm",
                });
              }}
            ></Button>
          </div>
          <div className="px-2">
            <Button
              name="Cancel"
              onClick={async () => {
                await deleteBooking({ bookingId: booking._id });
              }}
            ></Button>
          </div>
        </div>
      );
    }
  };
  const getBookingList = () => {
    if (booking !== undefined && booking.length > 0) {
      return (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10 justify-center items-center p-5">
          {booking?.map((booking) => {
            return booking.status !== "complete" ? (
              <div
                key={booking._id}
                className="flex flex-col items-center text-center h-full break-words p-5 duration-300
                                    bg-white w-auto border-2 border-gray rounded-3xl drop-shadow-lg"
              >
                {getName(booking)}
                <div className="text-gray-500">
                  {booking.startDateTime.getDate()}/
                  {booking.startDateTime.getMonth()}/
                  {booking.startDateTime.getFullYear()}
                </div>
                {getTime(booking)}
                {getBottomRow(booking)}
              </div>
            ) : (
              <></>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="text-gray-400 mt-5 p-5 text-center text-2xl">
          There is currently no upcoming training appointment scheduled.
        </div>
      );
    }
  };
  return (
    <>
      <main className="w-full flex bg-backgroundColor pt-24 h-full min-h-screen flex-col">
        <div className="text-3xl mx-8">Training session appointments</div>
        <div className="flex-col flex justify-center w-full">
          {getBookingList()}
        </div>
      </main>
    </>
  );
};
export default Notification;

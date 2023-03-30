import { useEffect, useState } from "react";
import {
  BookingList,
  deleteBooking,
  getBookings,
  updateBooking,
} from "@/services/booking.service";
import { Button } from "@/components/button";
import { getCurrentUserProfile, UserProfile } from "@/services/user.service";
import { formatDateTime } from "@/utils/date";
import Link from "next/link";
import {
  CheckCircleIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";

const Notification = () => {
  const [booking, setBooking] = useState<[BookingList]>();
  const [profile, setProfile] = useState<UserProfile>();
  const [isBookingsUpdate, setBookingsUpdate] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUserProfile().then((data) => {
      setProfile(data);
    });
  }, []);

  useEffect(() => {
    if (isBookingsUpdate) {
      getBookings().then((data) => {
        setBooking(data);
        setBookingsUpdate(false);
      });
    }
    console.log("update");
  }, [isBookingsUpdate]);

  const getName = (booking: BookingList) => {
    const name =
      profile?.usertype === "Trainee"
        ? booking.trainerFirstName + " " + booking.trainerLastName
        : booking.traineeFirstName + " " + booking.traineeLastName;
    return <div className="text-xl font-500">{name}</div>;
  };

  const getBottomRow = (booking: BookingList) => {
    if (booking.status === "complete") {
      return (
        <div className="pt-5 flex items-center text-green-light font-bold">
          <CheckCircleIcon className="h-8 w-8 mr-2" strokeWidth={2} />
          Complete
        </div>
      );
    }
    if (profile?.usertype === "Trainee") {
      if (booking.status === "confirm") {
        if (booking.payment.status === "paid") {
          return <div className="pt-5 flex font-bold">Paid</div>;
        }
        return (
          <>
            <div className="pt-5 flex font-bold">Confirmed</div>
            <Link
              href={`/user/booking/payment/${booking._id}`}
              className="flex mt-1"
            >
              Click to&nbsp;
              <span className="text-blue hover:underline">Pay</span>
              <CursorArrowRaysIcon
                className="h-6 w-6 ml-2 text-blue"
                strokeWidth={2}
              />
            </Link>
          </>
        );
      }
      return (
        <div className="pt-5 flex text-gray font-bold">
          Waiting for confirmation.
        </div>
      );
    } else {
      if (booking.status === "confirm") {
        if (booking.payment.status === "paid") {
          return (
            <div className="flex justify-between pt-5">
              <div className="px-2">
                <Button
                  name="Complete Booking"
                  onClick={async () => {
                    await updateBooking({
                      bookingId: booking._id,
                      status: "complete",
                    }).then(() => setBookingsUpdate(true));
                  }}
                ></Button>
              </div>
            </div>
          );
        }
        return <div className="pt-5 flex font-bold">Confirmed</div>;
      }
      return (
        <div className="flex justify-between pt-5">
          <div className="px-2">
            <Button
              name="Confirm"
              onClick={async () => {
                await updateBooking({
                  bookingId: booking._id,
                  status: "confirm",
                }).then(() => setBookingsUpdate(true));
              }}
            ></Button>
          </div>
          <div className="px-2">
            <Button
              name="Cancel"
              onClick={async () => {
                await deleteBooking({ bookingId: booking._id }).then(() =>
                  setBookingsUpdate(true)
                );
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
            const [date, time] = formatDateTime(
              booking.startDateTime,
              booking.endDateTime
            );
            return (
              <div
                key={booking._id}
                className="flex flex-col items-center text-center h-full break-words p-5 duration-300
                                    bg-white w-auto border-2 border-gray rounded-3xl drop-shadow-lg"
              >
                {getName(booking)}
                <div className="text-gray">
                  {date} <br /> {time}
                </div>
                {getBottomRow(booking)}
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="text-gray mt-5 p-5 text-center text-2xl">
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

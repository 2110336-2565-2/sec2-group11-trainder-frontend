import { BackButton } from "@/components/backbutton";
import { Button } from "@/components/button";
import { BookingInput, createBooking } from "@/services/booking.service";
import { generateDate } from "@/util/calendar";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";

const Calendar = () => {
  const router = useRouter();
  const { username, firstname, lastname } = router.query;
  const now = dayjs();
  const [selectedDate, setSelectedDate] = useState(now);
  const [startTime, setStartTime] = useState<number>(-1);
  const [endTime, setEndTime] = useState<number>(-1);
  const [isWarning, setWarning] = useState<boolean>(false);

  const handleSubmitBooking = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (endTime === -1 || startTime === -1) {
        setWarning(true);
        return;
      }
      const input = {
        date: selectedDate.format("YYYY-MM-DD"),
        endTime: `${endTime.toString()}:59`,
        startTime: `${startTime.toString()}:00`,
        trainer: username,
      } as BookingInput;
      createBooking(input).then(() => {
        router.push("/user/booking/complete");
      });
    },
    [endTime, router, selectedDate, startTime, username]
  );

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const BookingCalendar = () => {
    return (
      <div className="px-5 h-full">
        <div className="flex w-full items-center justify-center my-2 font-bold text-xl sm:text-2xl">
          <button
            className="hover:cursor-pointer hover:bg-pink-light rounded-xl p-2"
            onClick={() =>
              setSelectedDate(
                selectedDate.set("month", selectedDate.month() - 1)
              )
            }
          >
            <ChevronLeftIcon className="h-6 w-6" strokeWidth={3} />
          </button>
          <div className="w-3/5 sm:w-2/5 text-center">
            {selectedDate.format("MMMM YYYY")}
          </div>
          <button
            className="hover:cursor-pointer hover:bg-pink-light rounded-xl p-2"
            onClick={() =>
              setSelectedDate(
                selectedDate.set("month", selectedDate.month() + 1)
              )
            }
          >
            <ChevronRightIcon className="h-6 w-6" strokeWidth={3} />
          </button>
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
                <button
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
                </button>
              );
            }
          )}
        </div>
      </div>
    );
  };

  const TimeSlot = () => {
    const setTimeSlot = (time: number) => {
      if (startTime === -1) {
        setStartTime(time);
        setEndTime(time);
      } else if (time === startTime) {
        if (startTime === endTime) {
          setStartTime(-1);
          setEndTime(-1);
        } else {
          setStartTime(time + 1);
        }
      } else if (time === endTime) {
        setEndTime(time - 1);
      } else if (time >= startTime) {
        setEndTime(time);
      } else if (time < startTime) {
        setStartTime(time);
      }
    };

    return (
      <>
        {Array.from(Array(24).keys()).map((time) => {
          return (
            <button
              className={`flex w-full px-5 items-center h-14 ${
                time >= startTime && time <= endTime ? "bg-pink" : "bg-white"
              } border-y border-gray`}
              key={time}
              onClick={() => setTimeSlot(time)}
            >
              {time}.00
            </button>
          );
        })}
      </>
    );
  };

  return (
    <main className="w-full h-screen bg-white pt-20 px-6 pb-6 flex">
      {/* Warning */}
      <div className="flex my-3">
        <Transition appear show={isWarning} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setWarning(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center text-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95 opacity-100"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-sm h-full transform overflow-hidden bg-white p-3 text-center align-middle shadow-xl transition-all rounded-2xl">
                    <ExclamationCircleIcon
                      className="h-10 w-10 text-pink-dark"
                      strokeWidth={2}
                    />
                    <Dialog.Title
                      as="h2"
                      className="text-lg md:text-xl font-bold leading-6 text-pink-dark"
                    >
                      Warning
                    </Dialog.Title>
                    <div className="mt-4">Please select time slot.</div>

                    <div className="flex justify-center mt-10">
                      <Button
                        name="Got it!"
                        width="w-1/2"
                        onClick={() => setWarning(false)}
                        type="button"
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>

      {/* Calendar & Time slot */}
      <div className="flex flex-grow flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 h-2/3 md:h-full flex flex-col bg-backgroundColor p-5">
          <div className="flex items-center text-2xl md:text-3xl font-bold">
            <BackButton
              mx="mx-4"
            />
            {firstname} {lastname}
          </div>
          <div className="flex-1">
            <BookingCalendar />
          </div>
        </div>
        <div className="w-full md:w-1/3 h-1/3 md:h-full bg-backgroundColor px-5 py-2 md:p-5 flex flex-col">
          <div className="text-xl mb-4">
            {selectedDate.format("ddd, MMMM D, YYYY")}
          </div>
          {selectedDate.isBefore(now.format("YYYY-MM-DD")) ? (
            <div className="flex items-center justify-center h-full bg-gray-light">
              Sorry, You cannot book the training in the past.
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-sm mb-2">
                <p className="text-gray">Please select time slot.</p>
                <button
                  className={`${
                    startTime !== -1 ? "block" : "hidden"
                  } hover:underline text-pink-dark`}
                  onClick={() => {
                    setStartTime(-1);
                    setEndTime(-1);
                  }}
                >
                  clear selected slot
                </button>
              </div>
              <div className="flex-1 mb-2 overflow-y-auto">
                <TimeSlot />
              </div>
            </>
          )}

          <form className="flex justify-center" onSubmit={handleSubmitBooking}>
            <Button
              name="Booking"
              width="w-3/5"
              type="submit"
              disabled={selectedDate.isBefore(now.format("YYYY-MM-DD"))}
            />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Calendar;

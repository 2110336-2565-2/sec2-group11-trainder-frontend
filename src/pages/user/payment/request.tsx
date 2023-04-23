import { BackButton } from "@/components/common/backbutton";
import { Button } from "@/components/common/button";
import { InputBox } from "@/components/common/inputBox";
import { Modal } from "@/components/common/modal";
import { Booking } from "@/services/booking.service";
import {
  RequestPayoutInput,
  getPaymentList,
  requestPayout,
} from "@/services/payment.service";
import { formatDateTime } from "@/utils/date";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const RequestPayout = () => {
  const [paidBookings, setPaidBookings] = useState<Booking[]>([]);
  const [bookingId, setBookingId] = useState<string>("");
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(true);

  useEffect(() => {
    if (update) {
      getPaymentList().then((bookings) => {
        setPaidBookings(bookings);
        setUpdate(false);
      });
    }
  }, [update]);

  const handleRequestPayout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      bank: { value: string };
      accountName: { value: string };
      accountNumber: { value: string };
    };
    requestPayout({
      bookingID: bookingId,
      bank: target.bank.value,
      accountName: target.accountName.value,
      accountNumber: target.accountNumber.value,
    } as RequestPayoutInput).then(() => {
      setOpenForm(false);
      setUpdate(true);
    });
  };

  const renderRequestPayoutForm = () => {
    const fields = [
      { name: "bank", placeholder: "Bank" },
      { name: "accountName", placeholder: "Account Name" },
      { name: "accountNumber", placeholder: "Account Number" },
    ];
    return (
      <div className="mt-5 mx-5">
        {fields.map((field, index) => {
          return (
            <InputBox
              type={"text"}
              placeholder={field.placeholder}
              name={field.name}
              required={true}
              key={index}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen h-full w-full pt-20">
      <div className="flex items-center justify-start px-2 md:px-5">
        <BackButton />
        <p className="ml-5 text-xl md:text-3xl">Request Payout</p>
      </div>
      <div className="px-5">
        {paidBookings.length != 0 ? (
          <>
            {paidBookings.map((booking, index) => {
              const [date, time] = formatDateTime(
                booking.startDateTime,
                booking.endDateTime
              );
              return (
                <div
                  key={booking._id}
                  className={`flex items-center justify-between ${
                    index == 0 ? "" : "border-t"
                  } border-gray border-collapse py-5 px-5 hover:bg-gray-light hover:bg-opacity-60`}
                >
                  <div className="flex">
                    <Bars3Icon className="h-6 w-6 mr-5" strokeWidth={2} />
                    <div>
                      <p className="font-bold text-gray-dark">
                        Booking details
                      </p>
                      <p className="px-2">Trainee : {booking.trainee}</p>
                      <p className="px-2">
                        Date : {date} {time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="mr-10 w-36 text-xl font-bold text-pink-dark">
                      {booking.payment.totalCost.toString()} ฿
                    </p>
                    <Button
                      name={"Request Payout"}
                      onClick={() => {
                        setOpenForm(true);
                        setBookingId(booking._id);
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <Modal
              isShow={openForm}
              onClose={() => setOpenForm(false)}
              title="Please fill your account details"
            >
              <form onSubmit={handleRequestPayout}>
                {renderRequestPayoutForm()}
                <div className="flex justify-center mt-10 mx-5 space-x-10">
                  <Button name="Confirm" width="w-1/2" type="submit" />
                  <Button
                    name="Cancel"
                    width="w-1/2"
                    onClick={() => setOpenForm(false)}
                    type="button"
                  />
                </div>
              </form>
            </Modal>
          </>
        ) : (
          <div className="flex justify-center text-gray text-lg mt-10">
            There is no booking that you can request.
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestPayout;

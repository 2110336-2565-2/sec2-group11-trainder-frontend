import { BackButton } from "@/components/common/backbutton";
import { Button } from "@/components/common/button";
import { InputBox } from "@/components/common/inputBox";
import { Booking, getBooking } from "@/services/booking.service";
import { createPayment } from "@/services/payment.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useOmise } from "use-omise";

const Payment = () => {
  const router = useRouter();
  const { bookingID } = router.query;
  const [booking, setBooking] = useState<Booking>();

  const [loadingBooking, setLoadingBooking] = useState<boolean>(true);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  useEffect(() => {
    setLoadingBooking(true);
    if (typeof bookingID == "string") {
      getBooking(bookingID)
        .then((res) => {
          setLoadingBooking(false);
          setBooking(res);
        })
        .catch((err) => {
          setLoadingBooking(false);
          if (err.response) {
            alert(err.response);
          }
          throw err;
        });
    }
  }, [bookingID, router]);

  // TODO: Handle omise loading properly
  const { loading, createTokenPromise } = useOmise({
    publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY
      ? process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY
      : "",
  });

  const handleValidExpirationDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const exp_month = e.currentTarget.elements.namedItem(
      "expiration_month"
    ) as HTMLInputElement;
    const exp_year = e.currentTarget.elements.namedItem(
      "expiration_year"
    ) as HTMLInputElement;

    if (exp_month.value && exp_year.value) {
      const now = new Date();
      if (Number(exp_year.value) < now.getFullYear() % 100) {
        setShowWarning(true);
      } else if (
        Number(exp_year.value) === now.getFullYear() % 100 &&
        Number(exp_month.value) < now.getMonth() + 1
      ) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      number: { value: string };
      security_code: { value: string };
      expiration_month: { value: string };
      expiration_year: { value: string };
    };
    const data = {
      name: target.name.value,
      number: target.number.value,
      security_code: target.security_code.value,
      expiration_month: target.expiration_month.value,
      expiration_year: target.expiration_year.value,
    };
    try {
      if (createTokenPromise) {
        const token = await createTokenPromise("card", data);
        if (typeof bookingID == "string") {
          console.log(token);
          createPayment(bookingID, token).then((res) => {
            alert(res.data.message);
            console.log(res);
            router.push("/user/notification");
          });
        }
      } else {
        throw new Error("createTokenPromise is null");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      {!loadingBooking && (
        <div className="w-full min-h-screen h-full flex flex-col pt-20">
          <div className="flex items-center justify-start px-2 md:px-5">
            <BackButton mx="mr-2 md:mr-5" />
            <p className="ml-5 text-xl md:text-3xl">Payment</p>
          </div>
          <div className="flex flex-col md:flex-row my-4 md:my-8 items-center md:items-start justify-center space-x-0 md:space-x-8 lg:space-x-16">
            <div className="flex flex-col m-4 p-4 md:p-8 bg-white rounded-2xl shadow-lg">
              <h1 className="text-lg md:text-xl font-semibold mb-4">
                Booking Information
              </h1>
              <div className="flex flex-col ml-5 space-y-2">
                <div>
                  <span className="font-semibold">Booking ID:</span> &emsp;
                  {booking?._id}
                </div>
                <div>
                  <span className="font-semibold">Trainer:</span> &emsp;
                  {booking?.trainer}
                </div>
                <div>
                  <span className="font-semibold">Trainee:</span> &emsp;
                  {booking?.trainee}
                </div>
              </div>
            </div>

            <form
              className="w-5/6 md:w-1/2 p-3"
              onSubmit={handleSubmit}
              onChange={handleValidExpirationDate}
            >
              <InputBox
                type="text"
                placeholder="cardholder name"
                name="name"
                required={true}
              />
              <InputBox
                type="text"
                placeholder="card number"
                name="number"
                required={true}
              />
              <InputBox
                type="text"
                placeholder="security code"
                name="security_code"
                required={true}
                pattern="[0-9]{3}"
              />
              <div className="grid grid-cols-2 justify-items-stretch">
                <InputBox
                  type="text"
                  placeholder="(MM) expiration month"
                  name="expiration_month"
                  required={true}
                  pattern="[0-9]{1,2}"
                  borderColor={showWarning ? "border-pink-dark" : undefined}
                />
                <InputBox
                  type="text"
                  placeholder="(YY) expiration year"
                  name="expiration_year"
                  required={true}
                  pattern="[0-9]{2}"
                  borderColor={showWarning ? "border-pink-dark" : undefined}
                />
              </div>
              {showWarning ? (
                <div className="flex justify-end mr-2 text-pink-dark text-sm">
                  The expiration must be in the future.
                </div>
              ) : (
                <></>
              )}
              <div className="w-full h-0.5 bg-gray rounded-full my-5"></div>
              <div className="flex justify-between mx-4 md:mx-8">
                <p>Total</p>
                <p className="text-pink-dark">{`${booking?.payment.totalCost} THB`}</p>
              </div>
              <div className="flex justify-end mt-5">
                <Button name="Pay now" type="submit" width="w-2/3 md:w-1/3" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;

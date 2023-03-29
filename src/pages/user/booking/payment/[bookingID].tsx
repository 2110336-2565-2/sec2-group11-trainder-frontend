import { InputBox } from "@/components/inputBox";
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

  // TODO: Fix styles
  return (
    <>
      {!loadingBooking && (
        <div className="flex h-screen items-center align-middle">
          <div className="flex flex-col ml-5">
            <div>{`Booking ${bookingID}`}</div>
            <div>
              {`Trainer: ${booking?.trainer}, Trainee: ${booking?.trainee}`}
            </div>
            <div>{`Paying ${booking?.payment.totalCost} THB`}</div>
          </div>
          <form className="w-1/2 p-3 mt-2" onSubmit={handleSubmit}>
            <InputBox
              type="text"
              placeholder="name"
              name="name"
              required={true}
              margin="my-2"
            />
            <InputBox
              type="text"
              placeholder="number"
              name="number"
              required={true}
              margin="my-2"
            />
            <InputBox
              type="text"
              placeholder="security_code"
              name="security_code"
              required={true}
              margin="my-2"
            />
            <InputBox
              type="text"
              placeholder="expiration_month"
              name="expiration_month"
              required={true}
              margin="my-2"
            />
            <InputBox
              type="text"
              placeholder="expiration_year"
              name="expiration_year"
              required={true}
              margin="my-2"
            />
            <button className="border-2 p-3">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Payment;

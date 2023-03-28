import { InputBox } from "@/components/inputBox";
import React, { useState } from "react";
import { useOmise } from "use-omise";

const Payment = () => {
  const [paymentAmount, setPaymentAmount] = useState<Number>(0);
  const [bookingId, setBookingId] = useState<string>("AAAAAAA");

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
    console.log(data);
    try {
      if (createTokenPromise) {
        const token = await createTokenPromise("card", data);
        console.log(token);
        console.log(bookingId);
      }
      // Send the token to your server to create a charge
    } catch (error) {
      // Handle error on the UI
    }
  };

  return (
    <div className="flex h-screen items-center align-middle">
      {`Booking ${bookingId}, Paying ${paymentAmount} THB`}
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
        <button className="border-2"> Submit</button>
      </form>
    </div>
  );
};

export default Payment;

import { Button } from "@/components/button";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const BookingComplete = () => {
  const router = useRouter();
  return (
    <main className="min-h-screen h-full bg-backgroundColor pt-20 px-6 pb-6 flex">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <CheckBadgeIcon className="h-32 w-32 my-10" />
        <div className="text-xl">
          Your Booking is completed!! <br />
          Please wait for trainer confirmation.
        </div>
        <Button
          name={"Back to home"}
          width="w-1/2 sm:w-1/3 md:w-1/5"
          margin="mt-20"
          onClick={() => router.push("/user/home")}
        />
      </div>
    </main>
  );
};

export default BookingComplete;

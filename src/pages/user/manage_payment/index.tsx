import { BackButton } from "@/components/common/backbutton";
import { Button } from "@/components/common/button";
import { User, getCurrentUser } from "@/services/auth.service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaceFrownIcon } from "@heroicons/react/20/solid";
import { Booking } from "@/services/booking.service";
import { getPaymentNeedPayout } from "@/services/payment.service";
import { formatDateTime } from "@/utils/date";
import { Bars3Icon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

const Payment = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [needPayoutBookings, setNeedPayoutBookings] = useState<Booking[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userProfile = getCurrentUser();
    if (userProfile) {
      setUser(userProfile);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    getPaymentNeedPayout().then((bookings) => {
      setNeedPayoutBookings(bookings);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {user?.usertype === "Admin" ? (
        <>
          {!loading && (
            <div className="min-h-screen h-full w-full pt-20">
              <div className="flex items-center justify-start px-2 md:px-5">
                <BackButton />
                <p className="ml-5 text-xl md:text-3xl">
                  Manage trainer payment
                </p>
              </div>
              <div className="mt-5 mx-5">
                <div className="flex items-center text-xl mb-5 font-bold">
                  <CurrencyDollarIcon
                    className="h-10 w-10 mr-3 ml-1 text-yellow"
                    strokeWidth={2}
                  />
                  Need Payout Bookings
                </div>
                <div className="border-t border-b border-gray overflow-auto">
                  {needPayoutBookings.length != 0 ? (
                    <>
                      {needPayoutBookings.map((booking) => {
                        const [date, time] = formatDateTime(
                          booking.startDateTime,
                          booking.endDateTime
                        );
                        return (
                          <div
                            key={booking._id}
                            className="flex items-center border-t border-b border-gray py-5 px-5 hover:bg-gray-light hover:bg-opacity-60"
                          >
                            <Bars3Icon className="h-6 w-6 mr-5" strokeWidth={2}/>
                            <div className=" ">
                              <p className="font-bold text-gray-dark">Booking details</p>
                              <p className="px-2">
                                Trainer : {booking.trainer}
                              </p>
                              <p className="px-2">
                                Date : {date} {time}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="flex justify-center text-gray text-lg mt-10">
                      There is no payment that need payout.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="min-h-screen h-full w-full pt-20 flex">
          <div className="flex flex-1 flex-col items-center justify-center">
            <FaceFrownIcon className="h-20 w-20 text-pink-dark" />
            <div className="text-xl mt-10">
              Sorry! You are not allowed to access this page.
            </div>
            <div className="mt-5">
              <Button name={"Go Back"} onClick={() => router.back()} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;

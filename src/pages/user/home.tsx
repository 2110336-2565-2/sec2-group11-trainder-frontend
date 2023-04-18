import Calendar from "@/components/home/calendar";
import { MenuItem } from "@/components/home/menuItem";
import { User, getCurrentUser } from "@/services/auth.service";
import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [profile, setProfile] = useState<User>();
  useEffect(() => {
    setLoading(true);
    const user = getCurrentUser();
    if (user) {
      setProfile(user);
    }
    setLoading(false);
  }, []);

  return (
    <main className="min-h-screen h-full w-full pt-20">
      {!loading && (
        <>
          {profile?.usertype != "Admin" ? (
            <>
              <div>
                <h1 className="px-3 md:px-7 text-xl md:text-2xl font-bold">
                  Upcoming Schedule
                </h1>
                <Calendar usertype={profile?.usertype ?? ""} />
              </div>
              <div className="bg-gray h-1 mx-10 rounded-full"></div>
              <div className="flex flex-col sm:flex-row px-10 py-5 items-center gap-10">
                <MenuItem
                  text="Booking new training"
                  href="/user/booking"
                  icon={
                    <div className="flex w-11 h-11 items-center justify-center text-white rounded-full bg-pink">
                      <PlusIcon className="h-6 w-6" strokeWidth={4} />
                    </div>
                  }
                />
                {profile?.usertype === "Trainer" ? (
                  <MenuItem
                    text="View Your Reviews"
                    href={`/user/review/${encodeURIComponent(
                      profile.username
                    )}`}
                    icon={
                      <DocumentTextIcon
                        className="h-11 w-11 text-blue"
                        strokeWidth={2}
                      />
                    }
                  />
                ) : (
                  <MenuItem
                    text="Add Reviews"
                    href={`/user/review`}
                    icon={
                      <DocumentTextIcon
                        className="h-11 w-11 text-blue"
                        strokeWidth={2}
                      />
                    }
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <h1 className="px-3 md:px-7 text-xl md:text-2xl font-bold">
                Menu
              </h1>
              <div className="flex flex-col sm:flex-row px-10 py-5 items-center gap-10">
                <MenuItem
                  text={"Manage Payment"}
                  href={"/user/manage_payment"}
                  icon={
                    <CurrencyDollarIcon
                      className="h-11 w-11 text-blue"
                      strokeWidth={2}
                    />
                  }
                />
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
};

export default Home;

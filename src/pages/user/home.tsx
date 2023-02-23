import Calendar from "@/components/calendar";
import { MenuItem } from "@/components/menuItem";
import { getCurrentUserProfile, UserProfile } from "@/services/user.service";
import { DocumentTextIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const Home = () => {
  const [profile, setProfile] = useState<UserProfile>();
  useEffect(() => {
    getCurrentUserProfile().then((data) => {
      setProfile(data);
    });
  }, []);

  return (
    <main className="min-h-screen h-full w-full bg-backgroundColor">
      <Calendar />
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
        {profile?.usertype === "Trainer" && (
          <MenuItem
            text="View All Reviews"
            href="/user/review"
            icon={
              <DocumentTextIcon
                className="h-11 w-11 text-blue"
                strokeWidth={2}
              />
            }
          />
        )}
      </div>
    </main>
  );
};

export default Home;

import { logout } from "@/services/auth.service";
import { getCurrentUserProfile, UserProfile } from "@/services/user.service";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { NavBar } from "@/components/navbar";
const profile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>();
  const handleLogout = useCallback(() => {
    logout();
    router.push("/");
  }, []);
  useEffect(() => {
    getCurrentUserProfile().then((data) => {
      setProfile(data);
    });
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex bg-blue h-screen justify-center">
        <div className="container bg-backgroundColor rounded-3xl drop-shadow-lg w-1/2 h-3/4 mt-16 animate-fade">
          <div className="text-4xl mt-10 text-center">
            <p>
              Hello, {profile?.firstname} {profile?.lastname}
            </p>
          </div>
          <div className="py-6">
            <img src="../trainder_icon.png" alt="" className="w-1/3 mx-auto" />
          </div>
          <div className=" container bg-white p-10 rounded-3xl w-4/5 mx-auto">
            <div className="columns-2 text-xl">
              <div>
                ID: <strong>*********{profile?.citizenId.slice(9, 13)}</strong>
              </div>
              <div>
                Birth-Date:{" "}
                <strong>{profile?.birthdate.toString().split("T")[0]}</strong>
              </div>
              <div>
                Gender: <strong>{profile?.gender}</strong>
              </div>
              <div>
                Phone: <strong>{profile?.phoneNumber}</strong>
              </div>
              <div>
                Address: <strong>{profile?.address}</strong>
              </div>
              <div>
                Sub-Address: <strong>{profile?.subAddress}</strong>
              </div>
            </div>
          </div>
          <hr className="w-1/3 h-1 bg-black mx-auto mt-10"></hr>
        </div>
      </div>
    </>
  );
};

export default profile;

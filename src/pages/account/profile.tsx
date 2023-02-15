import { getCurrentUserProfile, UserProfile } from "@/services/user.service";
import { useEffect, useState } from "react";
import Link from "next/link";
const profile = () => {
  const [profile, setProfile] = useState<UserProfile>();

  useEffect(() => {
    getCurrentUserProfile().then((data) => {
      setProfile(data);
    });
  }, []);
  const getBirthDate = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = profile?.birthdate.getDate();
    const month = months[profile?.birthdate.getMonth()!];
    const year = profile?.birthdate.getFullYear();
    return (
      <div>
        Birth:{" "}
        <strong>
          {date}/{month}/{year}
        </strong>
      </div>
    );
  };
  const getGender = () => {
    const gender = (profile?.gender[0].toUpperCase() ?? "") + (profile?.gender.slice(1) ?? "");
    return (
      <div>
        Gender: <strong>{gender}</strong>
      </div>
    );
  };
  const getID = () => {
    return (
      <div>
        ID: <strong>*********{profile?.citizenId.slice(9, 13)}</strong>
      </div>
    );
  };
  const getPhone = () => {
    return (
      <div>
        Phone:{" "}
        <strong>
          {profile?.phoneNumber.slice(0, 3)}-{profile?.phoneNumber.slice(3, 6)}-
          {profile?.phoneNumber.slice(6)}
        </strong>
      </div>
    );
  };
  const getAddress = () => {
    return (
      <div>
        Address: <strong>{profile?.address}</strong>
      </div>
    );
  };
  return (
    <main className="bg-blue min-h-screen h-full flex">
      <div className="flex flex-1 justify-center items-center mt-10">
        <div className="flex flex-col items-center bg-backgroundColor rounded-3xl drop-shadow-lg w-5/6 md:w-2/3 xl:w-1/2 py-5 px-6 md:px-10 animate-fade">
          <div className="text-2xl md:text-3xl lg:text-4xl text-center">
            <p>
              Hello,{" "}
              <strong>
                {profile?.firstname} {profile?.lastname}
              </strong>
            </p>
          </div>
          <div className="py-6">
            <img src="../trainder_icon.png" alt="" className="w-1/2 md:w-2/3 mx-auto" />
          </div>
          <div className="bg-white py-8 px-10 rounded-3xl w-fit flex justify-center">
            <div className="columns-1 sm:columns-2 text-lg md:text-xl">
              {getID()}
              {getBirthDate()}
              {getGender()}
              {getPhone()}
              {getAddress()}
            </div>
          </div>
          {profile?.usertype === "Trainer" ? (
            <div className="container w-full mx-auto flex justify-center mt-6">
              <Link
                href="/account/info"
                className=" bg-pink hover:bg-pink-dark text-white text-center shadow rounded-xl px-6 py-2"
              >
                Update Trainer Information
              </Link>
            </div>
          ) : (
            <></>
          )}
          <hr className="w-1/3 h-1 bg-black mx-auto mt-8"></hr>
        </div>
      </div>
    </main>
  );
};

export default profile;

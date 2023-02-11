import { getCurrentUserProfile, UserProfile } from "@/services/user.service";
import { useEffect, useState } from "react";
import { NavBar } from "@/components/navbar";
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
    const genderFirst = profile?.gender[0].toUpperCase();
    const gender = genderFirst! + profile?.gender.slice(1);
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
  const getSubAddress = () => {
    return (
      <div>
        Sub-Address: <strong>{profile?.subAddress}</strong>
      </div>
    );
  };
  return (
    <main className="bg-blue h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 justify-center items-center">
        <div className="container bg-backgroundColor rounded-3xl drop-shadow-lg w-1/2 p-8 animate-fade">
          <div className="text-4xl text-center">
            <p>
              Hello,{" "}
              <strong>
                {profile?.firstname} {profile?.lastname}
              </strong>
            </p>
          </div>
          <div className="py-6">
            <img src="../trainder_icon.png" alt="" className="w-1/3 mx-auto" />
          </div>
          <div className=" container bg-white p-10 rounded-3xl w-5/6 mx-auto">
            <div className="columns-2 text-xl">
              {getID()}
              {getBirthDate()}
              {getGender()}
              {getPhone()}
              {getAddress()}
              {getSubAddress()}
            </div>
          </div>
          {profile?.usertype === "Trainer" ? (
            <div className="container w-full mx-auto flex justify-center mt-6">
              <a
                href="/account/info"
                className=" bg-pink hover:bg-pink-dark text-white shadow rounded-xl px-6 py-2"
              >
                Update Trainer Information
              </a>
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

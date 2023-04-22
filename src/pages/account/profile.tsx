import {
  getCurrentUserProfile,
  getProfileImage,
  UserProfile,
} from "@/services/user.service";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/button";
import { useRouter } from "next/router";
import Image from "next/image";
import { formatFromDate } from "@/utils/date";

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserProfile>();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [updateImage, setUpdateImage] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    getCurrentUserProfile().then((data) => {
      setProfile(data);
      getProfileImage(data.username).then((data) => {
        setProfileImage(data);
        setLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    if (updateImage) {
      if (profile?.username) {
        setLoading(true);
        getProfileImage(profile.username).then((data) => {
          setProfileImage(data);
          setLoading(false);
          setUpdateImage(false);
        });
      }
    }
  }, [profile?.username, updateImage]);

  const getBirthDate = () => {
    if (profile?.birthdate) {
      const [birthdate, _] = formatFromDate(profile?.birthdate);
      return (
        <div>
          Birth: <strong>{birthdate}</strong>
        </div>
      );
    }
  };
  const getGender = () => {
    const gender =
      (profile?.gender[0].toUpperCase() ?? "") +
      (profile?.gender.slice(1) ?? "");
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
    <>
      {!loading && (
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
              <div className="flex justify-center py-6 h-full w-full">
                <button
                  className="relative h-40 md:h-48 w-40 md:w-48 rounded-full hover:opacity-70 hover:cursor-pointer"
                  onClick={() => {}}
                >
                  <div className="relative object-cover h-full w-full rounded-full overflow-hidden">
                    <Image
                      src={
                        profileImage
                          ? URL.createObjectURL(profileImage)
                          : "/trainder_icon.png"
                      }
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </button>
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
                  <Button
                    name="Update Trainer Information"
                    width="w-fit"
                    onClick={() => router.push("/account/info")}
                  />
                </div>
              ) : (
                <></>
              )}
              <hr className="w-1/3 h-1 bg-black mx-auto mt-8"></hr>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Profile;

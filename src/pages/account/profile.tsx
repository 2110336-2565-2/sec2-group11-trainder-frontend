import {
  getCurrentUserProfile,
  getProfileImage,
  uploadProfileImage,
  UserProfile,
} from "@/services/user.service";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/button";
import { useRouter } from "next/router";
import Image from "next/image";
import { formatFromDate } from "@/utils/date";
import { ArrowUpTrayIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { Modal } from "@/components/common/modal";

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserProfile>();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [updateImage, setUpdateImage] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    getCurrentUserProfile().then((data) => {
      setProfile(data);
      getProfileImage(data.username).then((data) => {
        setProfileImage(data);
        setSelectedImage(data);
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
          setSelectedImage(data);
          setLoading(false);
          setUpdateImage(false);
        });
      }
    }
  }, [profile?.username, updateImage]);

  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0] == undefined) return;
    setSelectedImage(e.target.files[0]);
    setShowMessage(true);
  };

  const uploadImage = () => {
    if (selectedImage && selectedImage !== profileImage) {
      uploadProfileImage(selectedImage).then(() => {
        setUpdateImage(true);
        setIsOpenModal(false);
        setShowMessage(false);
      });
    }
  };

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
                  className="relative h-40 md:h-48 w-40 md:w-48 rounded-full hover:cursor-pointer"
                  onClick={() => setIsOpenModal(true)}
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
                    <div className="absolute flex items-center justify-center h-full w-full bg-gray-dark bg-opacity-40 opacity-0 hover:opacity-100">
                      <ArrowUpTrayIcon className="h-24 w-24" />
                    </div>
                  </div>
                </button>
                <Modal
                  isShow={isOpenModal}
                  onClose={() => setIsOpenModal(false)}
                  title="Choose New Profile Picture"
                  icon={<PhotoIcon className="h-10 w-10" strokeWidth={2} />}
                  width="w-1/2"
                >
                  <div className="flex items-center justify-center mt-5">
                    <label
                      htmlFor="display-file"
                      className="h-20 w-20 md:h-40 md:w-40 rounded-full bg-gray-dark bg-opacity-50 border-2 border-dashed hover:cursor-pointer hover:opacity-60"
                    >
                      {selectedImage && (
                        <div className="relative object-cover h-full w-full rounded-full overflow-hidden">
                          <Image
                            src={URL.createObjectURL(selectedImage)}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      )}
                      <input
                        id="display-file"
                        type="file"
                        className="hidden"
                        onChange={handleProfileImg}
                      />
                    </label>
                  </div>

                  <div className="flex justify-end items-center mt-5">
                    {showMessage && (
                      <p className="text-pink-dark mr-5">
                        Click Save to update your profile image.
                      </p>
                    )}
                    <Button name="Save" width="w-fit" onClick={uploadImage} />
                  </div>
                </Modal>
              </div>
              <div className="bg-white py-8 px-10 rounded-3xl w-fit flex justify-center">
                <div className="columns-1 sm:columns-2 text-lg md:text-xl">
                  <div>
                    ID:{" "}
                    <strong>*********{profile?.citizenId.slice(9, 13)}</strong>
                  </div>
                  {getBirthDate()}
                  {getGender()}
                  <div>
                    Phone:{" "}
                    <strong>
                      {profile?.phoneNumber.slice(0, 3)}-
                      {profile?.phoneNumber.slice(3, 6)}-
                      {profile?.phoneNumber.slice(6)}
                    </strong>
                  </div>
                  <div>
                    Address: <strong>{profile?.address}</strong>
                  </div>
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

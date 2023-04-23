import { BackButton } from "@/components/common/backbutton";
import { Dropdown } from "@/components/common/dropdown";
import { getCurrentUser } from "@/services/auth.service";
import {
  getCurrentTrainerInfo,
  TrainerProfile,
  updateTrainerProfile,
} from "@/services/trainer.service";
import { getProfileImage, uploadProfileImage } from "@/services/user.service";
import { ArrowUpTrayIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";

const TrainerInfo = () => {
  const [trainerInfo, setTrainerInfo] = useState<TrainerProfile>({
    specialty: [],
    rating: 0,
    fee: 0,
    traineeCount: 0,
    certificateUrl: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<string[]>(
    trainerInfo.specialty === undefined ||
      (trainerInfo.specialty !== undefined && trainerInfo.specialty.length == 0)
      ? ["None"]
      : trainerInfo.specialty
  );
  const [selectedCertificate, setSelectedCertificate] = useState<File | null>(
    null
  );
  const [selectedProfileImg, setSelectedProfileImg] = useState<File | null>(
    null
  );
  const [fee, setFee] = useState(0);
  const [updatedMessage, setUpdatedMessage] = useState({
    message: "",
    color: "",
  });

  useEffect(() => {
    const user = getCurrentUser();
    getCurrentTrainerInfo().then((res) => {
      if (Object.keys(res).length === 0) return;
      setTrainerInfo(res);
      setSelectedSpec(res.specialty);
      setFee(res.fee);
      if (user) {
        getProfileImage(user.username).then((data) => {
          setProfileImage(data);
          setSelectedProfileImg(data);
        });
      }
    });
  }, []);

  const handleSpecialtyChange = (select: string[]) => {
    if (select.length == 0) {
      select = ["None"];
    } else if (select.length > 1 && select.includes("None")) {
      select = select.slice(1);
    }
    setSelectedSpec(select);
  };

  const handleCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0] == undefined) return;
    setSelectedCertificate(e.target.files[0]);
  };

  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0] == undefined) return;
    setSelectedProfileImg(e.target.files[0]);
  };

  const handleTrainerInfoForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let specialty: string[] = selectedSpec;
    if (specialty.includes("None")) {
      specialty = [];
    }
    updateTrainerProfile({
      specialty: specialty,
      rating: Number(trainerInfo.rating),
      fee: fee,
      traineeCount: Number(trainerInfo.traineeCount),
      certificateUrl: "",
    } as TrainerProfile)
      .then(() => {
        if (selectedProfileImg && selectedProfileImg !== profileImage) {
          uploadProfileImage(selectedProfileImg).then(() => {
            setUpdatedMessage({
              message: "Your information has been saved",
              color: "text-green-light",
            });
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status !== 200) {
          const errorMsg = error.response as typeof error.response & {
            data: {
              message: string;
            };
          };
          if (errorMsg.data.message !== undefined) {
            alert(errorMsg.data.message);
            return;
          }
        }
        throw error;
      });
  };

  const handleOnChange = () => {
    // This action still not work with specialty field.
    setUpdatedMessage({
      message: "You have unsaved changes",
      color: "text-pink-dark",
    });
  };

  const RenderInfoForm = () => {
    const info = [
      {
        label: "Specialty",
        name: "specialty",
        type: "select",
        data: [
          "None",
          "Weight Loss",
          "Weight Training",
          "Yoga",
          "Rehabilitation",
        ],
      },
      {
        label: "Fee",
        name: "fee",
        type: "number",
        data: trainerInfo.fee,
      },
      { label: "Certificate", name: "certificate", edit: true, type: "file" },
    ];

    return (
      <>
        {info.map((item, index) => {
          return (
            <div className="w-full my-2" key={index}>
              <div className="py-2 font-bold">{item.label}</div>
              {(() => {
                switch (item.type) {
                  case "select":
                    return (
                      <Dropdown
                        name={item.name}
                        value={selectedSpec}
                        onChange={handleSpecialtyChange}
                        options={
                          item.data
                            ? typeof item.data !== "number"
                              ? item.data
                              : []
                            : []
                        }
                        multiple={true}
                        width="w-full lg:w-2/5 md:w-3/5"
                      />
                    );
                  case "file":
                    return (
                      <>
                        <label
                          htmlFor="display-file"
                          className={`flex items-center justify-center w-full md:w-5/6 h-48 md:h-64 p-4 border border-gray border-dashed rounded-lg cursor-pointer bg-gray-light ${
                            selectedCertificate ? "" : "opacity-75"
                          } hover:bg-gray-dark hover:opacity-70`}
                        >
                          {selectedCertificate ? (
                            <div className="relative object-contain h-full w-full">
                              <Image
                                src={URL.createObjectURL(selectedCertificate)}
                                alt=""
                                fill
                                sizes="(max-width: 768px) 100vw"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          ) : (
                            <p className="text-gray font-bold">
                              Click to upload file
                            </p>
                          )}
                          <input
                            id="display-file"
                            type="file"
                            className="hidden"
                            onChange={handleCertificate}
                          />
                        </label>
                        <button
                          className={`pl-2 text-sm text-gray hover:underline hover:text-pink-dark ${
                            selectedCertificate ? "" : "hidden"
                          }`}
                          onClick={() => setSelectedCertificate(null)}
                          type="button"
                        >
                          Clear selected file
                        </button>
                      </>
                    );
                  default:
                    return (
                      <input
                        className="w-full lg:w-2/5 md:w-3/5 bg-white rounded-xl text-left py-2.5 px-3.5 border border-gray"
                        type={item.type}
                        value={fee}
                        name={item.name}
                        onChange={(e) => setFee(Number(e.target.value))}
                      />
                    );
                }
              })()}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <main className="min-h-screen h-full">
      <div className="flex flex-1 flex-col p-5 md:px-10">
        <div className="flex items-center mb-3 md:mb-8">
          <BackButton />
          <h1 className="text-xl md:text-3xl mx-5 md:mx-10">
            Your Personal Information
          </h1>
        </div>
        <form
          className="flex flex-col md:flex-row"
          onChange={handleOnChange}
          onSubmit={handleTrainerInfoForm}
        >
          {/* Trainer profile image */}
          <div className="w-full md:w-1/3 flex flex-col items-center mt-4 justify-center md:justify-start">
            <div className="relative h-fit">
              <div className="h-20 w-20 md:h-40 md:w-40 rounded-full bg-blue">
                {selectedProfileImg ? (
                  <div className="relative object-cover h-full w-full rounded-full overflow-hidden">
                    <Image
                      src={URL.createObjectURL(selectedProfileImg)}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <UserIcon className="text-white p-2" strokeWidth={1} />
                )}
              </div>
              <label
                htmlFor="profile-img"
                className="absolute flex justify-center items-center bg-gray-dark h-6 w-10 md:h-8 md:w-12 bottom-0 rounded-lg hover:bg-black hover:cursor-pointer"
              >
                <ArrowUpTrayIcon
                  className="text-gray-light h-4 w-4 md:h-6 md:w-6 "
                  strokeWidth={2}
                />
                <input
                  id="profile-img"
                  type="file"
                  className="hidden"
                  onChange={handleProfileImg}
                />
              </label>
            </div>
            <button
              className={`py-3 text-sm text-gray hover:underline hover:text-pink-dark ${
                selectedProfileImg !== profileImage ? "" : "hidden"
              }`}
              onClick={() => {
                if (profileImage) {
                  setSelectedProfileImg(profileImage);
                } else {
                  setSelectedProfileImg(null);
                }
              }}
              type="button"
            >
              Clear selected profile image
            </button>
          </div>
          {/* Information form */}
          <div className="flex flex-1 flex-col items-start px-4">
            {RenderInfoForm()}
            <div className="inline-flex items-center">
              <button
                className="py-2.5 px-5 mt-5 mb-3 bg-pink hover:bg-pink-dark shadow rounded-xl text-white"
                type="submit"
              >
                Save
              </button>
              <p className={`mx-2 mt-5 mb-3 ${updatedMessage.color}`}>
                {updatedMessage.message}
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default TrainerInfo;

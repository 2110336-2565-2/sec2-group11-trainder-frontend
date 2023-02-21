import { BackButton } from "@/components/backbutton";
import { Dropdown } from "@/components/dropdown";
import {
  getCurrentTrainerInfo,
  TrainerProfile,
  updateTrainerProfile,
} from "@/services/trainer.service";
import { ArrowUpTrayIcon, UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const renderInfoForm = () => {
  const [trainerInfo, setTrainerInfo] = useState<TrainerProfile>({
    specialty: [],
    rating: 0,
    fee: 0,
    traineeCount: 0,
    certificateUrl: "",
  });
  const [selectedSpec, setSelectedSpec] = useState<string[]>(
    trainerInfo.specialty === undefined ||
      (trainerInfo.specialty !== undefined && trainerInfo.specialty.length == 0)
      ? ["None"]
      : trainerInfo.specialty
  );
  const [selectedCertificate, setSelectedCertificate] = useState<File | null>(
    null
  );

  useEffect(() => {
    getCurrentTrainerInfo().then((res) => {
      if (Object.keys(res).length === 0) return;
      setTrainerInfo(res);
      setSelectedSpec(res.specialty);
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

  const removeSelectedCertificate = () => {
    setSelectedCertificate(null);
  };

  const info = [
    {
      label: "Specialty",
      name: "specialty",
      edit: true,
      type: "select",
      data: [
        "None",
        "Weight Loss",
        "Weight Training",
        "Yoga",
        "Rehabilitation",
      ],
    },
    { label: "Rating", name: "rating", edit: false, data: trainerInfo.rating },
    { label: "Fee", name: "fee", edit: false, data: trainerInfo.fee },
    {
      label: "Trainee Count",
      name: "traineeCount",
      edit: false,
      data: trainerInfo.traineeCount,
    },
    { label: "Certificate", name: "certificate", edit: true, type: "file" },
  ];

  return (
    <>
      {info.map((item, index) => {
        return (
          <div className="w-full my-2" key={index}>
            <div className="py-2 font-bold">{item.label}</div>
            {item.edit ? (
              <>
                {(() => {
                  switch (item.type) {
                    case "select":
                      return (
                        <Dropdown
                          name={item.name}
                          value={selectedSpec}
                          onChange={handleSpecialtyChange}
                          options={item.data ?? []}
                          multiple={true}
                          width="w-full lg:w-2/5 md:w-3/5"
                        />
                      );
                    case "file":
                      return (
                        <>
                          <label
                            htmlFor="display-file"
                            className={`flex items-center justify-center w-full md:w-5/6 h-48 md:h-64 border border-gray border-dashed rounded-lg cursor-pointer bg-gray-light ${
                              selectedCertificate ? "" : "opacity-75"
                            } hover:bg-gray-dark hover:opacity-70`}
                          >
                            {selectedCertificate ? (
                              <img
                                src={
                                  selectedCertificate
                                    ? URL.createObjectURL(selectedCertificate)
                                    : undefined
                                }
                                className="object-contain h-full w-full p-4"
                              />
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
                            onClick={removeSelectedCertificate}
                            type="button"
                          >
                            Clear selected file
                          </button>
                        </>
                      );
                    default:
                      return (
                        <input
                          type={item.type}
                          className="w-2/3 md:w-1/3 bg-white rounded-lg text-left py-2 px-3 border border-gray"
                        ></input>
                      );
                  }
                })()}
              </>
            ) : (
              <input
                className="px-3 bg-transparent"
                type={"number"}
                value={item.data || 0}
                name={item.name}
                disabled
              ></input>
            )}
          </div>
        );
      })}
    </>
  );
};

const TrainerInfo = () => {
  const [updatedMessage, setUpdatedMessage] = useState({
    message: "",
    color: "",
  });
  const [selectedProfileImg, setSelectedProfileImg] = useState<File | null>(
    null
  );

  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0] == undefined) return;
    setSelectedProfileImg(e.target.files[0]);
  };

  const removeSelectedProfileImg = () => {
    setSelectedProfileImg(null);
  };

  const handleTrainerInfoForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const infoData = e.target as typeof e.target & {
      rating: { value: number };
      fee: { value: number };
      traineeCount: { value: number };
      // certificateUrl: { value: string };
    };
    let i = 0;
    let specialty: string[] = [];
    while (e.currentTarget.elements.namedItem(`specialty[${i}]`) !== null) {
      let spec = e.currentTarget.elements.namedItem(
        `specialty[${i}]`
      ) as HTMLInputElement;
      if (spec.value !== "None") {
        specialty.push(spec.value);
      }
      i++;
    }
    updateTrainerProfile({
      specialty: specialty,
      rating: Number(infoData.rating.value),
      fee: Number(infoData.fee.value),
      traineeCount: Number(infoData.traineeCount.value),
      certificateUrl: "",
    } as TrainerProfile)
      .then(() => {
        setUpdatedMessage({
          message: "Your information has been saved",
          color: "text-green-light",
        });
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

  return (
    <main className="min-h-screen h-full bg-backgroundColor">
      <div className="flex flex-1 flex-col p-5 md:p-10">
        <div className="flex items-center mb-3 md:mb-8">
          <BackButton href="/account/profile" />
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
                  <img
                    src={URL.createObjectURL(selectedProfileImg)}
                    className="object-contain h-full w-full rounded-full"
                  />
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
                selectedProfileImg ? "" : "hidden"
              }`}
              onClick={removeSelectedProfileImg}
              type="button"
            >
              Clear selected profile image
            </button>
          </div>
          {/* Information form */}
          <div className="flex flex-1 flex-col items-start px-4">
            {renderInfoForm()}
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

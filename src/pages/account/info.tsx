import {
  getCurrentTrainerInfo,
  TrainerProfile,
} from "@/services/trainer.service";
import { Listbox } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  CheckIcon,
  ChevronDownIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
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
      setTrainerInfo(res);
      setSelectedSpec(res.specialty);
    });
  }, []);

  const handelSpecialityChange = (select: string[]) => {
    if (select.length == 0) {
      select = ["None"];
    } else if (select.length > 1 && select.includes("None")) {
      select = select.slice(1);
    }
    console.log(select);
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
      name: "Speciality",
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
    { name: "Rating", edit: false, data: trainerInfo.rating },
    { name: "Fee", edit: false, data: trainerInfo.fee },
    { name: "Trainee Count", edit: false, data: trainerInfo.traineeCount },
    { name: "Certificate", edit: true, type: "file" },
  ];

  return (
    <>
      {info.map((item, index) => {
        return (
          <div className="w-full my-2" key={index}>
            <div className="py-2 font-bold">{item.name}</div>
            {item.edit ? (
              <>
                {(() => {
                  switch (item.type) {
                    case "select":
                      return (
                        <Listbox
                          value={selectedSpec}
                          onChange={handelSpecialityChange}
                          multiple
                        >
                          <div className="relative">
                            <Listbox.Button className="relative w-2/3 md:w-1/3 bg-white rounded-lg text-left py-2 px-3 border border-gray">
                              <span className="block">
                                {selectedSpec.map((spec) => spec).join(", ")}
                              </span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon className="h-6 w-6" />
                              </span>
                            </Listbox.Button>
                            <Listbox.Options className="absolute my-2 bg-white w-2/3 md:w-1/3 rounded-lg border border-gray">
                              {item.data?.map((choice: string, index) => (
                                <Listbox.Option
                                  key={index}
                                  value={choice}
                                  disabled={index == 0 ? true : false}
                                  hidden={index == 0 ? true : false}
                                  className="py-2 px-3 hover:bg-blue rounded-md hover:text-white hover:cursor-pointer"
                                >
                                  {({ selected }) => (
                                    <div className="inline-flex items-center">
                                      {selected ? (
                                        <CheckIcon
                                          className="h-6 w-6 pr-2"
                                          strokeWidth={3}
                                        />
                                      ) : (
                                        <div className="h-6 w-6 pr-2"></div>
                                      )}
                                      <p
                                        className={`${
                                          selected ? "font-bold" : ""
                                        }`}
                                      >
                                        {choice}
                                      </p>
                                    </div>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      );
                    case "file":
                      return (
                        <>
                          <label
                            htmlFor="display-file"
                            className={`flex items-center justify-center w-full md:w-2/3 h-48 md:h-64 border border-gray border-dashed rounded-lg cursor-pointer bg-gray-light ${
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
              <div className="px-3">{item.data}</div>
            )}
          </div>
        );
      })}
    </>
  );
};

const TrainerInfo = () => {
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

  return (
    <main className="min-h-screen h-full bg-backgroundColor">
      <div className="flex flex-1 flex-col p-5 md:p-10">
        <div className="flex items-center mb-10">
          <a href="/account/profile">
            <ArrowLeftIcon
              className="h-10 w-10 md:h-12 md:w-12 hover:bg-pink-light rounded-xl p-2"
              strokeWidth={3}
            />
          </a>
          <h1 className="text-xl md:text-3xl mx-5 md:mx-10">
            Your Personal Information
          </h1>
        </div>
        <form className="flex">
          {/* Trainer profile image */}
          <div className="w-1/3 flex flex-col items-center">
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
          <div className="flex flex-1 flex-col items-start">
            {renderInfoForm()}
            <button
              className="py-2.5 px-5 mt-5 mb-3 bg-pink hover:bg-pink-dark shadow rounded-xl text-white"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default TrainerInfo;

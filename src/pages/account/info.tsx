import { Listbox } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  ChevronDownIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";

const profileImage: string = "";

const info = [
  {
    name: "Speciality",
    edit: true,
    type: "select",
    data: ["None", "Sample1", "Sample2", "Sample3"],
  },
  { name: "Rating", edit: false, data: 5 },
  { name: "Fee", edit: false, data: 100 },
  { name: "Trainee Count", edit: false, data: 20 },
  { name: "Certificate", edit: true, type: "file" },
];

const renderInfoForm = () => {
  const [selectedSpec, setSelectedSpec] = useState("None");
  const [selectedCertificate, setSelectedCertificate] = useState<File | null>(
    null
  );

  const handleCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0] == undefined) return;
    setSelectedCertificate(e.target.files[0]);
  };

  const removeSelectedCertificate = () => {
    setSelectedCertificate(null);
  };

  return (
    <>
      {info.map((item) => {
        return (
          <div className="w-full my-2">
            <div className="py-2 font-bold">{item.name}</div>
            {item.edit ? (
              <>
                {(() => {
                  switch (item.type) {
                    case "select":
                      return (
                        <Listbox
                          value={selectedSpec}
                          onChange={setSelectedSpec}
                        >
                          <div className="relative">
                            <Listbox.Button className="relative w-2/3 md:w-1/3 bg-white rounded-lg text-left py-2 px-3 border border-gray">
                              <span className="block">{selectedSpec}</span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon className="h-6 w-6" />
                              </span>
                            </Listbox.Button>
                            <Listbox.Options className="absolute my-2 bg-white w-2/3 md:w-1/3 rounded-lg border border-gray">
                              {item.data?.map((choice) => (
                                <Listbox.Option
                                  value={choice}
                                  className="py-2 px-3 hover:bg-blue rounded-md hover:text-white hover:cursor-pointer"
                                >
                                  {choice}
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
        <div className="flex">
          {/* Trainer profile image */}
          <div className="w-1/3 flex justify-center">
            <div className="relative h-fit">
              <div className="h-20 w-20 md:h-40 md:w-40 rounded-full bg-blue p-2">
                {profileImage && profileImage.trim() !== "" ? (
                  <img src={profileImage} />
                ) : (
                  <UserIcon className="text-white" strokeWidth={1} />
                )}
              </div>
              <div className="absolute flex justify-center items-center bg-gray-dark h-6 w-10 md:h-8 md:w-12 bottom-0 rounded-lg hover:bg-black hover:cursor-pointer">
                <ArrowUpTrayIcon
                  className="text-gray-light h-4 w-4 md:h-6 md:w-6"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
          {/* Information form */}
          <form className="flex flex-1 flex-col items-start">
            {renderInfoForm()}
            <button
              className="py-2.5 px-5 mt-5 mb-3 bg-pink hover:bg-pink-dark shadow rounded-xl text-white"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default TrainerInfo;

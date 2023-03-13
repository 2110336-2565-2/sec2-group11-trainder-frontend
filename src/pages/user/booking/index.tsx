import { BackButton } from "@/components/backbutton";
import { Button } from "@/components/button";
import {
  FilteredTrainerProfile,
  FilterInput,
  filterTrainer,
} from "@/services/trainer.service";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  StarIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

const TrainerFilter = () => {
  const [trainerProfiles, setTrainerProfiles] = useState<
    FilteredTrainerProfile[]
  >([]);

  const [specialtiesFilter, setSpecialtiesFilter] = useState<string[]>([]);
  useEffect(() => {
    filterTrainer({
      limit: 1000,
      specialty: specialtiesFilter,
    } as FilterInput).then((res) => {
      setTrainerProfiles(res);
    });
  }, [specialtiesFilter]);

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const filter = e.target as typeof e.target & {
      name: string;
      checked: boolean;
    };
    if (filter.checked) {
      if (specialtiesFilter.indexOf(filter.name) === -1) {
        setSpecialtiesFilter(specialtiesFilter.concat([filter.name]));
      }
    } else {
      const idx = specialtiesFilter.indexOf(filter.name);
      if (idx !== -1) {
        setSpecialtiesFilter(
          specialtiesFilter
            .slice(0, idx)
            .concat(specialtiesFilter.slice(idx + 1))
        );
      }
    }
  };

  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const openFilter = () => {
    setIsOpenFilter(true);
  };
  const closeFliter = () => {
    setIsOpenFilter(false);
  };

  const specialties = [
    "Weight Loss",
    "Rehabilitation",
    "Weight Training",
    "Yoga",
  ];

  return (
    <main className="w-full min-h-screen h-full bg-backgroundColor">
      <div className="w-full flex flex-col pt-20">
        <div className="flex items-center justify-start px-2 md:px-5">
          <BackButton />
          <p className="ml-5 text-xl md:text-3xl">Choose your trainer</p>
        </div>

        {/* Filter */}
        <div className="flex my-3">
          <button
            type="button"
            onClick={openFilter}
            className="mx-14 md:mx-20 px-2 py-1 md:px-3 md:py-2 flex items-center text-sm md:text-base bg-pink-light hover:bg-pink rounded-xl"
          >
            <FunnelIcon className="h-6 w-6 mr-2" strokeWidth={2} />
            select filter
          </button>

          <Transition appear show={isOpenFilter} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeFliter}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center text-center md:justify-start md:items-start p-4 md:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300 md:duration-400"
                    enterFrom="opacity-0 scale-95 md:scale-100 md:-translate-x-full md:opacity-100"
                    enterTo="opacity-100 scale-100 md:translate-x-0"
                    leave="ease-in duration-200 md:duration-400"
                    leaveFrom="opacity-100 scale-100 md:translate-x-0"
                    leaveTo="opacity-0 scale-95 md:-translate-x-full md:scale-100 md:opacity-100"
                  >
                    <Dialog.Panel className="w-full max-w-md h-full md:min-h-screen transform overflow-hidden bg-white p-6 md:p-8 text-left align-middle shadow-xl transition-all rounded-2xl md:rounded-none">
                      <Dialog.Title
                        as="h3"
                        className="text-lg md:text-xl font-bold leading-6 text-gray-900"
                      >
                        Filter
                      </Dialog.Title>
                      <div className="mt-4">
                        <form onChange={handleFormChange}>
                          <div className="flex items-center">
                            <h4>Specialty</h4>
                            <span className="bg-black h-0.5 w-full rounded-xl ml-4"></span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2 ">
                            {specialties.map((name, index) => {
                              return (
                                <label className="flex" key={index}>
                                  <input
                                    name={name}
                                    type="checkbox"
                                    className="mx-1 accent-[#296D6C]"
                                    checked={specialtiesFilter.includes(name)}
                                  />
                                  <p className="text-sm">{name}</p>
                                </label>
                              );
                            })}
                          </div>
                        </form>
                      </div>

                      <div className="flex justify-end md:justify-center mt-10">
                        <Button
                          name="Apply"
                          width="w-fit md:w-1/2"
                          onClick={closeFliter}
                          type="button"
                        />
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>

        {/* List of trainer */}
        <div className="mx-10 md:mx-28">
          {trainerProfiles.map((trainerProfile, idx) => {
            return (
              <div key={idx}>
                <Link href={`/user/booking/${encodeURIComponent(trainerProfile.username)}`}>
                  <div className="bg-white w-auto border-2 border-gray rounded-3xl flex flex-row items-center justify-between my-5 p-2 drop-shadow-lg hover:bg-gray-light">
                    <div className="flex items-center w-5/6">
                      {/* Profile image */}
                      <div className="bg-gray-300 w-32 h-32 rounded-lg m-3 hidden md:block"></div>
                      {/* Information */}
                      <div className="flex flex-col m-2">
                        <p className="text-lg md:text-xl font-semibold">
                          {trainerProfile.firstname} {trainerProfile.lastname} (
                          {trainerProfile.username})
                        </p>
                        {/* Only show specialties in case it exists */}
                        {trainerProfile.trainerInfo.specialty != null &&
                          trainerProfile.trainerInfo.specialty.length != 0 && (
                            <p className="text-blue-dark">
                              Specialties:{" "}
                              <span className="text-black">
                                {trainerProfile.trainerInfo.specialty.join(
                                  ", "
                                )}{" "}
                              </span>
                            </p>
                          )}
                        <div className="flex flex-row">
                          <p className="text-blue-dark">
                            Rating:{" "}
                            <span className="text-black">
                              {trainerProfile.trainerInfo.rating}
                            </span>
                          </p>
                          <div className="flex flex-row mx-2">
                            {[
                              ...Array<Number>(
                                Math.round(trainerProfile.trainerInfo.rating)
                              ),
                            ].map((e, idx) => {
                              return (
                                <StarIcon
                                  key={idx}
                                  className="h-6 w-6 fill-yellow stroke-yellow"
                                  strokeWidth={2}
                                ></StarIcon>
                              );
                            })}
                            {[
                              ...Array<Number>(
                                5 -
                                  Math.round(trainerProfile.trainerInfo.rating)
                              ),
                            ].map((e, idx) => {
                              return (
                                <StarIcon
                                  key={idx}
                                  className="h-6 w-6 fill-none stroke-yellow"
                                  strokeWidth={2}
                                ></StarIcon>
                              );
                            })}
                          </div>
                        </div>
                        <p className="text-blue-dark">
                          Training fee:{" "}
                          <span className="text-black">
                            {trainerProfile.trainerInfo.fee}
                          </span>
                        </p>
                        {/* <p className="text-blue-dark">
                        Currently Training:{" "}
                        <span className="text-black">
                          {trainerProfile.trainerInfo.traineeCount}
                        </span>
                      </p> */}
                      </div>
                    </div>
                    <ChevronRightIcon
                      className="w-12 h-12 text-gray mr-0 md:mr-5"
                      strokeWidth={2}
                    ></ChevronRightIcon>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default TrainerFilter;

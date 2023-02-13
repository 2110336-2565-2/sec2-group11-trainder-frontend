import {
  FilteredTrainerProfile,
  FilterInput,
  filterTrainer,
} from "@/services/trainer.service";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

const TrainerFilter = () => {
  const [trainerProfiles, setTrainerProfiles] = useState<
    FilteredTrainerProfile[]
  >([]);

  const [specialtiesFilter, setSpecialtiesFilter] = useState<string[]>([]);
  useEffect(() => {
    filterTrainer({
      limit: 10,
      specialty: specialtiesFilter,
    } as FilterInput).then((res) => setTrainerProfiles(res));
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

  return (
    <>
      <main className="h-screen bg-backgroundColor">
        <div className="grid grid-cols-2">
          <div className="bg-white box-border w-2/3 h-screen p-4 flex flex-col">
            <button className="flex">
              <p>FILTER</p>
              <ChevronDownIcon
                className="w-5 h-5 relative -right-full -mx-20"
                strokeWidth={3}
              ></ChevronDownIcon>
            </button>
            <hr className="my-2" />
            <button className="flex">
              <p>SPECIALITY</p>
              <ChevronUpIcon
                className="w-5 h-5 relative -right-3/4 mx-7"
                strokeWidth={3}
              ></ChevronUpIcon>
            </button>
            <hr className="my-2" />
            <form onChange={handleFormChange}>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex">
                  <input
                    name="Weight Loss"
                    type="checkbox"
                    className="mx-1 accent-[#296D6C]"
                  />
                  <p className="text-sm">Weight Loss</p>
                </label>
                <label className="flex">
                  <input
                    name="Rehabilitation"
                    type="checkbox"
                    className="mx-1 accent-[#296D6C]"
                  />
                  <p className="text-sm">Rehabilitation</p>
                </label>
                <label className="flex ">
                  <input
                    name="Weight Training"
                    type="checkbox"
                    className="mx-1 accent-[#296D6C]"
                  />
                  <p className="text-sm">Weight Training</p>
                </label>
                <label className="flex">
                  <input
                    name="Yoga"
                    type="checkbox"
                    className="mx-1 accent-[#296D6C]"
                  />
                  <p className="text-sm">Yoga</p>
                </label>
              </div>
            </form>
            <button className="flex">
              <p>TRAINING FEE</p>
              <ChevronDownIcon
                className="w-5 h-5 relative -right-3/4 mx-2"
                strokeWidth={3}
              ></ChevronDownIcon>
            </button>
            <hr className="my-2" />
            <button className=" bg-pink hover:bg-pink-dark rounded-lg absolute bottom-7 left-20 mx-20 w-60 h-12 drop-shadow-lg">
              <p className="text-xl text-white">Apply</p>
            </button>
          </div>
          <div className="absolute left-1/3 mx-20">
            <div className="flex flex-row m-8 relative right-9">
              <Link href="/user/home">
                <ArrowLeftIcon
                  className="w-8 h-8"
                  strokeWidth={3}
                ></ArrowLeftIcon>
              </Link>
              <p className="text-2xl font-semibold mx-3">Choose your trainer</p>
            </div>
            <div>
              {trainerProfiles.map((trainerProfile, idx) => {
                return (
                  <div key={idx}>
                    <Link
                      href={"/user/booking/trainer/" + trainerProfile.username}
                    >
                      <div className="bg-white w-auto border-2 border-gray-400 rounded-3xl flex flex-row m-5 p-5 drop-shadow-lg hover:">
                        <div className="bg-gray-300 w-20 h-22 rounded-lg m-3"></div>
                        <div className="flex flex-col m-2">
                          <p className="text-2xl font-semibold">
                            {trainerProfile.firstname} {trainerProfile.lastname}{" "}
                            ({trainerProfile.username})
                          </p>
                          <p>
                            Specialties:{" "}
                            {trainerProfile.trainerInfo.specialty.join(", ")}{" "}
                          </p>
                          <div className="flex flex-row">
                            <p>Rating: {trainerProfile.trainerInfo.rating}</p>
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
                                    Math.round(
                                      trainerProfile.trainerInfo.rating
                                    )
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
                          <p>Training fee: {trainerProfile.trainerInfo.fee}</p>
                          {/* <p>Currently Training: {trainerProfile.trainerInfo.traineeCount}</p> */}
                        </div>
                        <ChevronRightIcon
                          className="w-10 h-10 mx-20 my-10 stroke-gray-500"
                          strokeWidth={2}
                        ></ChevronRightIcon>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TrainerFilter;

import { BackButton } from "@/components/common/backbutton";
import {
  FilteredTrainerProfile,
  FilterInput,
  filterTrainer,
} from "@/services/trainer.service";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

const Review = () => {
  const [trainerProfiles, setTrainerProfiles] = useState<
    FilteredTrainerProfile[]
  >([]);

  useEffect(() => {
    filterTrainer({
      limit: 1000,
      specialty: [],
    } as FilterInput).then((res) => {
      setTrainerProfiles(res);
    });
  }, []);

  return (
    <main className="w-full min-h-screen h-full">
      <div className="w-full flex flex-col pt-20">
        <div className="flex items-center justify-start px-2 md:px-5">
          <BackButton />
          <p className="ml-5 text-xl md:text-3xl">Choose trainer to review</p>
        </div>

        <div className="mx-10 md:mx-28">
          {trainerProfiles.map((trainerProfile, idx) => {
            return (
              <div key={idx}>
                <Link
                  href={`/user/review/${encodeURIComponent(
                    trainerProfile.username
                  )}`}
                >
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
                                />
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
                      </div>
                    </div>
                    <ChevronRightIcon
                      className="w-12 h-12 text-gray mr-0 md:mr-5"
                      strokeWidth={2}
                    />
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

export default Review;

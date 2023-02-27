import { useEffect, useState } from "react";
import { UserProfile } from "@/services/user.service";
import { useRouter } from "next/router";
import { getTrainerProfile, TrainerProfile } from "@/services/trainer.service";
import { useLoadScript } from "@react-google-maps/api";
import Map, { LatLngLiteral } from "@/components/map";
import { BackButton } from "@/components/backbutton";
import { Button } from "@/components/button";
import Link from "next/link";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
const BookTrainerProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [trainerCoordinate, setTrainerCoordinate] = useState<LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [trainerProfile, setTrainerProfile] = useState<UserProfile>({
    username: "user",
    firstname: "firstname",
    lastname: "lastname",
    birthdate: new Date(),
    citizenId: "none",
    gender: "none",
    phoneNumber: "none",
    address: "none",
    usertype: "none",
    lat: 0,
    lng: 0,
  });
  const [trainerInfo, setTrainerInfo] = useState<TrainerProfile>({
    specialty: [],
    rating: 0,
    fee: 0,
    traineeCount: 0,
    certificateUrl: "",
  });

  useEffect(() => {
    if (typeof username == "string") {
      getTrainerProfile(username)
        .then((res) => {
          setLoading(true);
          setTrainerProfile(res.userProfile);
          setTrainerInfo(res.trainerProfile);
          setTrainerCoordinate({
            lat: res.userProfile.lat,
            lng: res.userProfile.lng,
          });
          setLoading(false);
        })
        .catch(() => router.back());
    } else {
      router.back();
    }
  }, [router, username]);

  const Name = () => {
    return (
      <p className="text-left text-2xl md:text-3xl font-bold">
        {trainerProfile.firstname} {trainerProfile.lastname}
      </p>
    );
  };

  const Skill = () => {
    return (
      <div className="text-start text-lg md:text-xl mt-5 ml-10 mr-10 mb-5 leading-loose font-semibold">
        {trainerInfo.specialty !== null && trainerInfo.specialty.length > 0 && (
          <div>
            Specialties :{" "}
            <span className="font-normal">
              {trainerInfo.specialty.join(", ")}
            </span>{" "}
            <br />
          </div>
        )}
        <div>
          Rating: <span className="font-normal">{trainerInfo.rating}</span>{" "}
          <br />
        </div>
        <div>
          Training Fee:{" "}
          <span className="font-normal">{trainerInfo.fee} Baht</span>
          <br />
        </div>
        <div>
          Area: <span className="font-normal">{trainerProfile.address}</span>{" "}
          <br />
        </div>
        <div>
          Currently Training:{" "}
          <span className="font-normal">
            {trainerInfo.traineeCount.toString() +
              " Person" +
              (trainerInfo.traineeCount == 1 ? " " : "s")}
            {/* {trainerProfile.traineeCount > 0
              ? trainerProfile.traineeCount.toString() +
                " Person" +
                (trainerProfile.traineeCount == 1 ? " " : "s")
              : "Not training anyone"} */}
          </span>
          <br />
        </div>

        {/* TODO: show this after certificateUrl are implemented */}
        {/* <Link href={trainerProfile.certificateUrl}>Certificate</Link> */}
      </div>
    );
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      : "",
  });
  if (!isLoaded || loading) return <div>Loading...</div>;
  return (
    <main className="min-h-screen h-full w-full bg-backgroundColor">
      <div className="min-h-screen h-full flex flex-col md:flex-row">
        {/* Profile image and name */}
        <div className="flex flex-col w-full md:w-2/5 px-5 md:px-10 pt-20 pb-10">
          <div className="flex items-center justify-start">
            <BackButton href="/user/booking" mx="mr-2 md:mr-5" />
            <Name />
          </div>
          <Link
            className="w-full flex justify-end mt-5 pr-10 md:pr-6 lg:pr-10"
            href={{
              pathname: "user/review/[username]",
              query: { username: username },
            }}
          >
            <div className="px-3 py-2 flex text-sm md:text-base items-center bg-pink-light hover:bg-pink rounded-xl">
              <DocumentTextIcon className="h-6 w-6 mr-2" />
              <span>View All Reviews</span>
            </div>
          </Link>
          <div className=" mt-6 md:mt-10 flex justify-center h-full">
            <div className="object-cover overflow-hidden rounded-2xl relative w-28 h-28 sm:w-36 sm:h-36 md:w-72 md:h-72">
              <Image
                src="/default_profile.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw"
              />
            </div>
          </div>
        </div>

        <span className="flex md:hidden w-auto h-0.5 bg-gray-dark opacity-50 rounded-3xl mx-16"></span>
        {/* Information */}
        <div className="flex flex-col items-center w-full h-full bg-transparent pb-10 md:w-3/5 md:min-h-screen md:bg-white md:pt-20">
          <Skill />
          <div className="w-3/4 h-[36rem]">
            <Map trainerCoordinate={trainerCoordinate} />
          </div>
          <div className="flex w-full mt-10 px-16 lg:px-24 justify-around space-x-10 sm:space-x-16 md:space-x-20">
            <Button name="Start Chat" />
            <Button
              name="Calendar"
              onClick={() =>
                router.push(
                  {
                    pathname: "/user/booking/[username]/calendar",
                    query: {
                      username: username,
                      firstname: trainerProfile.firstname,
                      lastname: trainerProfile.lastname,
                    },
                  },
                )
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookTrainerProfile;

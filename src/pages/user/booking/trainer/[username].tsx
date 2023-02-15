import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUserProfile, UserProfile } from "@/services/user.service";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { getTrainerProfile, TrainerProfile } from "@/services/trainer.service";
import { useLoadScript } from "@react-google-maps/api";
import Map from "@/components/map";
import { getCurrentUser } from "@/services/auth.service";
const bookTrainerProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [userAddress, setUserAddress] = useState<string>("");

  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: "user",
    firstname: "firstname",
    lastname: "lastname",
    birthdate: new Date(),
    citizenId: "none",
    gender: "none",
    phoneNumber: "none",
    address: "none",
    usertype: "none",
  });
  const [trainerProfile, setTrainerProfile] = useState<TrainerProfile>({
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
          setUserProfile(res.userProfile);
          setTrainerProfile(res.trainerProfile);
        })
        .catch(() => router.back());
      getCurrentUserProfile().then((data) => {
        setUserAddress(data.address);
        setLoading(false);
      });
    } else {
      router.back();
    }
  }, []);

  const Image = () => {
    return (
      <div className="max-h-min overflow-hidden mt-6 md:mt-10 flex justify-center">
        <img
          src="/default_profile.jpg"
          alt=""
          className="rounded-2xl object-contain w-28 h-28 sm:w-36 sm:h-36 md:w-fit md:h-fit"
        />
      </div>
    );
  };

  const Name = () => {
    return (
      <p className="text-left text-2xl md:text-3xl font-bold">
        {userProfile.firstname} {userProfile.lastname}
      </p>
    );
  };

  const Skill = () => {
    return (
      <p className="text-start text-lg md:text-xl mt-5 ml-10 mr-10 mb-5 leading-loose font-semibold">
        {trainerProfile.specialty !== null &&
          trainerProfile.specialty.length > 0 && (
            <div>
              Specialties :{" "}
              <span className="font-normal">
                {trainerProfile.specialty.join(", ")}
              </span>{" "}
              <br />
            </div>
          )}
        <div>
          Rating: <span className="font-normal">{trainerProfile.rating}</span>{" "}
          <br />
        </div>
        <div>
          Training Fee:{" "}
          <span className="font-normal">{trainerProfile.fee} Baht</span>
          <br />
        </div>
        <div>
          Area: <span className="font-normal">{userProfile.address}</span>{" "}
          <br />
        </div>
        <div>
          Currently Training:{" "}
          <span className="font-normal">
            {trainerProfile.traineeCount.toString() +
              " Person" +
              (trainerProfile.traineeCount == 1 ? " " : "s")}
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
      </p>
    );
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      : "",
  });
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main className="min-h-screen h-full w-full bg-backgroundColor">
      {!loading && (
        <div className="min-h-screen h-full flex flex-col md:flex-row">
          {/* Profile image and name */}
          <div className="flex flex-col w-full md:w-2/5 px-5 md:px-10 pt-20 pb-10">
            <div className="flex items-center justify-start">
              <Link href="/user/booking" className="mr-2 md:mr-5">
                <ArrowLeftIcon
                  className="h-10 w-10 md:h-12 md:w-12 hover:bg-pink-light rounded-xl p-2"
                  strokeWidth={3}
                />
              </Link>
              <Name />
            </div>
            <Image />
          </div>

          <span className="flex md:hidden w-auto h-0.5 bg-gray-dark opacity-50 rounded-3xl mx-16"></span>
          {/* Information */}
          <div className="flex flex-col items-center w-full h-full bg-transparent pb-10 md:w-3/5 md:min-h-screen md:bg-white md:pt-20">
            <Skill />
            <div className="w-3/4 h-[36rem]">
              <Map userAddress={userAddress} />
            </div>
            <div className="flex flex-row justify-center mt-10 mx-auto space-x-20">
              <button className="px-5 py-2 md:px-16 md:py-3 bg-pink hover:bg-pink-dark text-white shadow rounded-xl">
                Start Chat
              </button>
              <button className="px-5 py-2 md:px-16 md:py-3 bg-pink hover:bg-pink-dark text-white shadow rounded-xl">
                Calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default bookTrainerProfile;

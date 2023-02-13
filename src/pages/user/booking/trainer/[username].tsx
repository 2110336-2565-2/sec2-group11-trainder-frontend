import { useEffect, useState } from "react";
import Link from "next/link";
import { UserProfile } from "@/services/user.service";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { getTrainerProfile, TrainerProfile } from "@/services/trainer.service";
const bookTrainerProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: "user",
    firstname: "firstname",
    lastname: "lastname",
    birthdate: new Date(),
    citizenId: "none",
    gender: "none",
    phoneNumber: "none",
    address: "none",
    subAddress: "none",
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
          console.log(res.trainerProfile);
          setLoading(false);
        })
        .catch(() => router.back());
    } else {
      router.back();
    }
  }, []);

  const Image = () => {
    return (
      <img
        src="/default_profile.jpg"
        alt=""
        className="rounded-lg object-fill h-1/2  "
      />
    );
  };

  const Name = () => {
    return (
      <p className="font-lexend-deca text-left text-4xl text-black ">
        {userProfile.firstname} {userProfile.lastname}
      </p>
    );
  };

  const Skill = () => {
    return (
      <p className="text-start text-xl mt-10 ml-10 mr-10 mb-5">
        Specialties : {trainerProfile.specialty.join(", ")} <br />
        Rating: {trainerProfile.rating} <br />
        Training Fee: {trainerProfile.fee} Baht <br />
        Area: {userProfile.address} {userProfile.subAddress} <br />
        {/* TODO: show these after traineeCount and certificateUrl are implemented */}
        {/* Currently Training: {trainerProfile.traineeCount} people(s)<br /> */}
        {/* <Link href={trainerProfile.certificateUrl}>Certificate</Link> */}
      </p>
    );
  };

  return (
    <main className="flex flex-col h-screen">
      {!loading && (
        <div className="flex flex-row h-screen bg-white">
          <div className="w-2/5 h-full bg-backgroundColor md:flex flex-col items-center">
            <div className="w-full md:flex flex-row items-center justify-center mt-10 mb-[10%] m-[5%] ">
              <Link href="/user/booking" className="mr-[5%]">
                <ArrowLeftIcon className="w-7 h-7"></ArrowLeftIcon>
              </Link>
              <Name />
            </div>
            <Image />
          </div>

          <div className="w-3/5 h-full flex flex-col items-start justify-start">
            <Skill />
            {/* <div className="p-4">{content}</div> */}
            <img src="/demo_map.png" className="rounded-lg w-3/4 ml-10"></img>
            <div className="flex flex-row mt-5 ml-10 space-x-[20%] w-3/4">
              {/* TODO: When chat and calendar is ready uncomment the link */}
              {/* <Link href="/user/chat" className="ml-[15%]"> */}
              <button className="bg-pink text-gray-800 py-2 px-12 rounded shadow">
                Start Chat
              </button>
              {/* </Link> */}
              {/* <Link href=""> */}
              <button className="bg-pink text-gray-800  py-2 px-12 rounded shadow ">
                Calendar
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default bookTrainerProfile;

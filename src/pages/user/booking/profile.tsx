import { logout } from "@/services/auth.service";
import { getCurrentUserProfile } from "@/services/user.service";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { NavBar } from "@/components/navbar";
import { UserProfile } from "@/services/user.service";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
const profile = () => {
  const router = useRouter();
  const default_profile:UserProfile ={
    username:"user",
    firstname:"firstname",
    lastname:"lastname",
    birthdate: new Date(),
    citizenId:"none",
    gender:"none",
    phoneNumber:"none",
    address:"none",
    subAddress:"none"
  }
  const [profile, setProfile] = useState<UserProfile>(default_profile);
  const handleLogout = useCallback(() => {
    logout();
    router.push("/");
  }, []);
  useEffect(() => {
    getCurrentUserProfile().then((data) => {
      setProfile(data);
    });
  }, []);
  
  const content = JSON.stringify(profile);

  const GenImage =() =>{
    return <img src="/default_profile.jpg" alt="" className="rounded-lg object-fill h-1/2  " />
  }

  const GenName =() => {
    return (
      <p className="font-lexend-deca text-left text-4xl text-black ">
            {profile.firstname} {profile.lastname}
      </p>
    );
  }


  const GenSkill = () =>{
    return(
      <p className="text-start text-xl mt-10 ml-10 mr-10 mb-5">
          Specialities : <br></br>
          Rating: <br></br>
          Training Fee: Baht <br></br>
          Others : <br></br>
          Area: {profile.address} {profile.subAddress} <br></br>
      </p>
    );
  }

  return (
    <main className="flex flex-col h-screen">
      <NavBar/>
    <div className="flex flex-row h-screen bg-white">
        <div className="w-2/5 h-full bg-backgroundColor md:flex flex-col items-center">
          <div className="w-full md:flex flex-row items-center justify-center mt-10 mb-[10%] m-[5%] ">
            <Link href="/user/booking/filter" className="mr-[5%]">
              <ArrowLeftIcon className="w-7 h-7"></ArrowLeftIcon>
            </Link>
            <GenName/>
          </div>
          <GenImage/>
        </div>

        <div className="w-3/5  h-full flex flex-col items-start justify-start">
          <GenSkill/>
          {/* <div className="p-4">{content}</div> */}
          <img src="/demo_map.png" className ="rounded-lg w-3/4 ml-10"></img>
          <div className="flex flex-row mt-5 ml-10 space-x-[20%] w-3/4">
            <Link href="/user/chat" className="ml-[15%]">
              <button className="bg-pink text-gray-800 py-2 px-12 rounded shadow">
                  Start Chat
              </button>
            </Link>
            <Link href="">
            <button className="bg-pink text-gray-800  py-2 px-12 rounded shadow ">
                Calendar
            </button>
            </Link>
          </div>
        </div>
    </div>
    </main>
  );
};

export default profile;
import { logout } from "@/services/auth.service";
import { getCurrentUserProfile } from "@/services/user.service";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { NavBar } from "@/components/navbar";
import { UserProfile } from "@/services/user.service";

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
      <p className="text-start text-s mt-10 ml-10 mr-10 mb-5">
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
        <div className="w-2/5 h-full bg-backgroundColor md:flex flex-col items-center justify-center">
          <div className="md:flex flex-row m-[5%] items-center justify-center ">
            <Link href="/user/booking/filter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 mr-5">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
            </Link>
            <GenName/>
          </div>
          <GenImage/>
        </div>

        <div className="w-3/5  h-full flex flex-col items-start justify-start">
          <GenSkill/>
          {/* <div className="p-4">{content}</div> */}
          <img src="/demo_map.png" className ="rounded-lg w-3/4 ml-10"></img>
        </div>
    </div>
    </main>
  );
};

export default profile;
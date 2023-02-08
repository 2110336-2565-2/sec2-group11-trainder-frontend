import { logout } from "@/services/auth.service";
import { getCurrentUserProfile } from "@/services/user.service";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { NavBar } from "@/components/navbar";


const profile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>();
  const handleLogout = useCallback(() => {
    logout();
    router.push("/");
  }, []);
  useEffect(() => {
    // getCurrentUserProfile().then((data) => {
    //   setProfile(data);
    // });
  }, []);
  
  function GenImage(){
    return <img src="/default_profile.png" alt="" className="rounded-lg object-fill w-1/2  " />
  }

  function GenName(){
    return (
      <p className="text-center text-xl text-black ">
            Name Surname
      </p>
    );
  }

  function GenSkill(){
    return (
      <p className="text-start text-s p-10">
          specialities : <br></br>
          Rating: <br></br>
          Training Fee: Baht <br></br>
          Others : <br></br>
          Area: <br></br>
      </p>
    );
  }

  return (
    <main className="flex flex-col h-screen bg-white">
      <NavBar/>
      <div className="h-full flex-row">
        <div className="w-2/5 h-full bg-backgroundColor md:flex flex-col items-center justify-center">
            <Link href="/user/booking/filter">
              <img src="/back_icon.png" className="absolute top-20  left-5 object-contain w-5 "  />
            </Link>
          <div className="md:flex flex-row m-[5%] items-center justify-center ">
            <GenName/>
          </div>
            <GenImage/>
          </div>

        <div className="w-full md:w-3/5 h-full flex flex-col items-start justify-start ml-20 mt-10">
          <GenSkill/>
        </div>
      </div>
    </main>
  );
};

export default profile;
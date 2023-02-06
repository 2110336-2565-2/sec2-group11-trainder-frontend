import { logout } from "@/services/auth.service";
import { getCurrentUserProfile } from "@/services/user.service";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
const profile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>();
  const handleLogout = useCallback(() => {
    logout();
    router.push("/");
  }, []);
  useEffect(() => {
    getCurrentUserProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch(() => {
        router.push("/");
      });
  }, []);
  return (
    <div className="flex-auto h-screen w-full justify-center place-items-center bg-backgroundColor">
      <div>
        <div className="p-4">Logged In</div>
        <div className="p-4">{JSON.stringify(profile)}</div>
        <button
          className="p-4 border-2 border-red-500 hover:bg-red-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default profile;

import { getCurrentUserFromAPI } from "@/services/user.service";
import { useEffect, useState } from "react";
const profile = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    getCurrentUserFromAPI().then((data) => {
      setUsername(data.username);
    });
  });
  return (
    <div className="flex h-screen w-full justify-center place-items-center bg-backgroundColor">
      <div className="text-center">Username: {username}</div>
    </div>
  );
};

export default profile;

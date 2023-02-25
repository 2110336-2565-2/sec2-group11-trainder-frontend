import { LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { checkLoggedIn, login } from "@/services/auth.service";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/button";
import { InputBox } from "@/components/inputBox";

type LoginFormData = {
  username: { value: string };
  password: { value: string };
};

export default function Login() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const handleLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const target = e.target as typeof e.target & LoginFormData;
      login(target.username.value, target.password.value).then((data) => {
        if (data.status == 200) {
          setLoggedIn(true);
        } else if (data.message) {
          alert(data.message);
        }
      });
    },
    []
  );

  useEffect(() => {
    checkLoggedIn().then((res) => {
      setLoggedIn(res);
    });
  }, []);

  useEffect(() => {
    if (loggedIn) {
      router.push("/account/profile");
    }
  }, [loggedIn]);

  return (
    <main className="flex h-screen bg-backgroundColor">
      <div className="w-1/2 h-full bg-blue hidden md:flex flex-col items-center justify-center">
        <img src="/login.png" alt="" className="object-center scale-75" />
        <p className="text-center text-xl text-white">
          Be fit together with <span className="text-4xl">TRAINDER</span>
        </p>
      </div>
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center">
        <p className="text-center text-4xl">
          Welcome{" "}
          <span className="flex md:hidden">
            to&nbsp;<span className="text-blue">TRAINDER</span>
          </span>
        </p>
        <p className="text-center text-gray">Please login to your account</p>
        <form className="w-1/2 p-3 mt-2" onSubmit={handleLogin} method="post">
          <InputBox
            type="text"
            placeholder="Username"
            name="username"
            required={true}
            margin="my-2"
            icon={
              <UserCircleIcon
                className="absolute h-8 w-8 mr-2 right-0 text-gray"
                strokeWidth="2"
              />
            }
          />
          <InputBox
            type="password"
            placeholder="Password"
            name="password"
            required={true}
            margin="my-2"
            icon={
              <LockClosedIcon
                className="absolute h-8 w-8 mr-2 right-0 text-gray"
                strokeWidth="2"
              />
            }
          />
          <Button name="Login" margin="mt-10 mb-3" type="submit" />
        </form>
        <div className="absolute bottom-5 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/account/signup" className="text-blue hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}

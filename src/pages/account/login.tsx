import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { login } from "@/services/auth.service";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const data = login(target.username.value, target.password.value);
    router.push("/account/profile");
  };
  return (
    <main className="flex h-screen bg-backgroundColor">
      <div className="w-1/2 h-full bg-blue hidden md:flex flex-col items-center justify-center">
        <img src="/login.png" alt="" className="object-center scale-75" />
        <p className="text-center text-xl text-white font-lexand-deca">
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
          <div className="relative flex items-center">
            <input
              className="w-full pl-3.5 pr-12 py-2.5 mt-4 mb-2 block border border-gray rounded-xl"
              type="text"
              placeholder="Username"
              required
              name="username"
            ></input>
            <EnvelopeIcon
              className=" absolute h-8 w-8 mt-2 mr-2 right-0 text-gray"
              strokeWidth="2"
            />
          </div>
          <div className="relative flex items-center">
            <input
              className="w-full pl-3.5 pr-12 py-2.5 mt-4 mb-2 block border border-gray rounded-xl"
              type="password"
              placeholder="Password"
              required
              name="password"
            />
            <LockClosedIcon
              className="absolute h-8 w-8 mt-2 mr-2 right-0 text-gray"
              strokeWidth="2"
            />
          </div>
          <button
            className="w-full py-2.5 px-3 mt-10 mb-3 bg-pink hover:bg-pink-dark shadow rounded-xl text-white"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="absolute bottom-5 text-sm">
          Don't have an account?{" "}
          <Link href="/account/signup" className="text-blue hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}

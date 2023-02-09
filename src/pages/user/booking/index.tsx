import { getCurrentUser } from "@/services/auth.service";
import {
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  HomeIcon,
  UserCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const navLinks = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon className="mx-2 h-6 w-6 " strokeWidth={2} />,
  },
  {
    name: "Notification",
    path: "/user/notification",
    icon: <BellIcon className="mx-2 h-6 w-6" strokeWidth={2} />,
  },
  {
    name: "Chat",
    path: "/user/chat",
    icon: (
      <ChatBubbleLeftEllipsisIcon className="mx-2 h-6 w-6" strokeWidth={2} />
    ),
  },
];

const TrainerFilter = () => {
  const router = useRouter();
  return (
    <>
      <main className="h-screen bg-backgroundColor">
        <nav className="bg-blue flex px-6">
          <div className="flex items-center mr-10 justify-evenly">
            <p className="text-backgroundColor text-3xl mx-2 font-lexend-exa">
              Trainder
            </p>
            <img
              src="/trainder.png"
              alt=""
              className="object-contain h-16 w-16"
            />
          </div>
          <ul className="w-1/3 flex items-center justify-around">
            {navLinks.map((link, index) => {
              return (
                <li key={index}>
                  <Link
                    href={link.path}
                    key={index}
                    className={
                      "inline-flex items-center text-lg hover:underline " +
                      (router.asPath === link.path
                        ? "text-yellow"
                        : "text-white")
                    }
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="w-2/3 inline-flex items-center text-lg justify-end">
            <UserCircleIcon
              className="text-white h-6 w-6 mx-2"
              strokeWidth={2}
            />
            <p className="text-white">
              {getCurrentUser().username ?? "Username"}
            </p>
          </div>
        </nav>
        <div className="grid grid-cols-2">
          <div className="bg-white box-border w-2/3 h-screen p-4 flex flex-col">
            <div>
              <button>FILTER</button>
              <ChevronDownIcon
                className="w-5 h-5 inline-flex mx-5"
                strokeWidth={3}
              ></ChevronDownIcon>
              <hr className="my-2"/>
            </div>
            <div>
              <button>SPECIALITY</button>
              <ChevronUpIcon
                className="w-5 h-5 inline-flex mx-5"
                strokeWidth={3}
              ></ChevronUpIcon>
              <hr className="my-2" />
              <div className="box-border flex flex-row">
                <label className="mx-1">
                  <input type="checkbox" className="mx-1"/>
                  Weight Loss (100)
                </label>
                <label className="mx-1">
                  <input type="checkbox" className="mx-1"/>
                  Rehabilitation (100)
                </label>
                <label className="mx-1">
                  <input type="checkbox" className="mx-1"/>
                  Weight Training (100)
                </label>
                <label className="mx-1">
                  <input type="checkbox" className="mx-1"/>
                  Yoga (100)
                </label>
              </div>
            </div>
            <div>
              <button className="my-2">TRAINING FEE</button>
              <ChevronDownIcon
                className="w-5 h-5 inline-flex mx-5"
                strokeWidth={3}
              ></ChevronDownIcon>
              <hr className="my-2" />
            </div>
            <button className="bg-red-300 rounded-lg absolute bottom-20 mx-32 w-60 h-20 drop-shadow-lg">
            <p className="text-xl text-white">Apply</p>
            </button>
          </div>
          <div className="-mx-20">
            <div className="flex flex-row m-8 ">
              <ArrowLeftIcon
                className="w-8 h-8"
                strokeWidth={3}
              ></ArrowLeftIcon>
              <p className="text-2xl font-semibold mx-3">Choose your trainer</p>
            </div>
            <div className="box-border bg-white w-1/2 border-4 rounded-lg flex flex-row m-5 p-5 drop-shadow-lg">
              <div className="bg-slate-500 w-20 h-22 rounded-lg m-3"></div>
              <div className="flex flex-col m-2">
                <p className="text-2xl font-semibold">OATORO</p>
                <p>Specialities: </p>
                <p>Rating:</p>
                <p>Training fee:</p>
              </div>
              <ChevronRightIcon
                className="w-10 h-10 mx-20 my-10"
                strokeWidth={2}
                
              ></ChevronRightIcon>
            </div>
            <div className="box-border  bg-white w-1/2 border-4 rounded-lg flex flex-row m-5 p-5 drop-shadow-lg">
              <div className="bg-slate-500 w-20 h-22 rounded-lg m-3"></div>
              <div className="flex flex-col m-2">
                <p className="text-2xl font-semibold">ABCD</p>
                <p>Specialities: </p>
                <p>Rating:</p>
                <p>Training fee:</p>
              </div>
              <ChevronRightIcon
                className="w-10 h-10 mx-20 my-10"
                strokeWidth={2}
              ></ChevronRightIcon>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TrainerFilter;

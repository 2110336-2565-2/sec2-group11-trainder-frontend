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
import { NavBar } from "@/components/navbar";
import Rating from "@mui/material/Rating";

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
        <NavBar></NavBar>
        <div className="grid grid-cols-2">
          <div className="bg-white box-border w-2/3 h-screen p-4 flex flex-col">
            <button className="flex">
              <p>FILTER</p>
              <ChevronDownIcon
                className="w-5 h-5 relative -right-full -mx-20"
                strokeWidth={3}
              ></ChevronDownIcon>
            </button>
            <hr className="my-2" />
            <button className="flex">
              <p>SPECIALITY</p>
              <ChevronUpIcon
                className="w-5 h-5 relative -right-3/4 mx-7"
                strokeWidth={3}
              ></ChevronUpIcon>
            </button>
            <hr className="my-2" />
            <div className="box-border flex flex-row">
              <label className="mx-1">
                <input type="checkbox" className="mx-1" />
                Weight Loss (100)
              </label>
              <label className="mx-1">
                <input type="checkbox" className="mx-1" />
                Rehabilitation (100)
              </label>
              <label className="mx-1">
                <input type="checkbox" className="mx-1" />
                Weight Training (100)
              </label>
              <label className="mx-1">
                <input type="checkbox" className="mx-1" />
                Yoga (100)
              </label>
            </div>
            <button className="flex">
              <p>TRAINING FEE</p>
              <ChevronDownIcon
                className="w-5 h-5 relative -right-3/4 mx-1"
                strokeWidth={3}
              ></ChevronDownIcon>
            </button>
            <hr className="my-2" />
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
                <div className="flex flex-row">
                  <p>Rating:</p>
                  <Rating
                    name="half-rating-read"
                    defaultValue={3.5}
                    precision={0.5}
                    readOnly
                    className="mx-2"
                  />
                </div>
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
                <div className="flex flex-row">
                  <p>Rating:</p>
                  <Rating
                    name="half-rating-read"
                    defaultValue={3.5}
                    precision={0.5}
                    readOnly
                    className="mx-2"
                  />
                </div>
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

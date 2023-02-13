import { getCurrentUser } from "@/services/auth.service";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavBar } from "@/components/navbar";

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
            <hr className="my-2 " />
            <div className="grid grid-cols-2 gap-2">
              <label className="flex">
                <input type="checkbox" className="mx-1 accent-[#296D6C]" />
                <p className="text-sm">Weight Loss (100)</p>
              </label>
              <label className="flex">
                <input type="checkbox" className="mx-1 accent-[#296D6C]" />
                <p className="text-sm">Rehabilitation (100)</p>
              </label>
              <label className="flex ">
                <input type="checkbox" className="mx-1 accent-[#296D6C]" />
                <p className="text-sm">Weight Training (100)</p>
              </label>
              <label className="flex">
                <input type="checkbox" className="mx-1 accent-[#296D6C]" />
                <p className="text-sm">Yoga (100)</p>
              </label>
            </div>
            <button className="flex">
              <p>TRAINING FEE</p>
              <ChevronDownIcon
                className="w-5 h-5 relative -right-3/4 mx-2"
                strokeWidth={3}
              ></ChevronDownIcon>
            </button>
            <hr className="my-2" />
            <button className=" bg-pink hover:bg-pink-dark rounded-lg absolute bottom-7 left-20 mx-20 w-60 h-12 drop-shadow-lg">
              <p className="text-xl text-white">Apply</p>
            </button>
          </div>
          <div className="absolute left-1/3 mx-20">
            <div className="flex flex-row m-8 relative right-9">
              <button>
                <ArrowLeftIcon
                  className="w-8 h-8"
                  strokeWidth={3}
                ></ArrowLeftIcon>
              </button>
              <p className="text-2xl font-semibold mx-3">Choose your trainer</p>
            </div>
            <div className="bg-white w-auto border-2 border-gray-400 rounded-3xl flex flex-row m-5 p-5 drop-shadow-lg hover:">
              <div className="bg-gray-300 w-20 h-22 rounded-lg m-3"></div>
              <div className="flex flex-col m-2">
                <p className="text-2xl font-semibold">OATORO</p>
                <p>Specialities: </p>
                <div className="flex flex-row">
                  <p>Rating:</p>
                  <div className="flex flex-row mx-2">
                    <StarIcon
                      className="h-6 w-6 fill-yellow stroke-yellow"
                      strokeWidth={2}
                    ></StarIcon>
                    <StarIcon
                      className="h-6 w-6 fill-yellow stroke-yellow"
                      strokeWidth={2}
                    ></StarIcon>
                    <StarIcon
                      className="h-6 w-6 fill-yellow stroke-yellow"
                      strokeWidth={2}
                    ></StarIcon>
                    <StarIcon
                      className="h-6 w-6 fill-yellow stroke-yellow"
                      strokeWidth={2}
                    ></StarIcon>
                    <StarIcon
                      className="h-6 w-6 fill-none stroke-yellow"
                      strokeWidth={2}
                    ></StarIcon>
                  </div>
                </div>
                <p>Training fee:</p>
              </div>
              <button>
                <ChevronRightIcon
                  className="w-10 h-10 mx-20 my-10 stroke-gray-500"
                  strokeWidth={2}
                ></ChevronRightIcon>
              </button>
            </div>
            <div className=" bg-white w-auto border-2 border-gray-400 rounded-3xl flex flex-row m-5 p-5 drop-shadow-lg">
              <div className="bg-gray-300 w-20 h-22 rounded-lg m-3"></div>
              <div className="flex flex-col m-2">
                <p className="text-2xl font-semibold">ABCD</p>
                <p>Specialities: </p>
                <div className="flex flex-row">
                  <p>Rating:</p>
                  <div className="flex flex-row mx-2">
                    <StarIcon
                      className="h-6 w-6 fill-yellow stroke-yellow"
                      strokeWidth={2}
                    ></StarIcon>
                    <StarIcon
                      className="h-6 w-6 fill-yellow stroke-yellow"
                      strokeWidth={2}
                    ></StarIcon>
                    <StarIcon
                      className="h-6 w-6 fill-yellow stroke-yellow"
                      strokeWidth={2}
                    ></StarIcon>
                    <StarIcon
                      className="h-6 w-6 fill-none  stroke-yellow"
                      strokeWidth={2}
                    >
                    </StarIcon>
                    <StarIcon
                      className="h-6 w-6 fill-none stroke-yellow"
                      strokeWidth={2}
                    ></StarIcon>
                  </div>
                </div>
                <p>Training fee:</p>
              </div>
              <button>
                <ChevronRightIcon
                  className="w-10 h-10 mx-20 my-10 stroke-gray-500"
                  strokeWidth={2}
                ></ChevronRightIcon>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TrainerFilter;

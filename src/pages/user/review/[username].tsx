import { BackButton } from "@/components/backbutton";
import { Button } from "@/components/button";
// import { InputBox } from "@/components/inputBox";
import { useState } from "react";

const Review = () => {
  const [showModal, setShowModal] = useState(false);
  const Image = () => {
    return (
      <div className="max-h-min overflow-hidden mt-6 md:mt-10 flex justify-center">
        <img
          src="/default_profile.jpg"
          alt=""
          className="rounded-2xl object-contain w-28 h-28 sm:w-36 sm:h-36 md:w-fit md:h-fit"
        />
      </div>
    );
  };
  const RatingStar = () => {
    return (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
          className="h-10 w-10 none-yellow stroke-slate-300"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          ></path>
        </svg>
      </div>
    );
  };
  const ReviewBox = () => {
    return (
      <div className="h-[20%] w-[80%] bg-white mb-[5%] border-2 border-gray rounded-3xl items-center justify-between drop-shadow-lg hover:bg-gray-light"></div>
    );
  };

  return (
    <>
      <div className="w-full h-screen flex flex-row items-center justify-center text-3xl bg-backgroundColor">
        <div className="w-2/5 h-screen flex-col">
          <div className="mt-[20%]"></div>
          <div className="flex items-center justify-start px-2 md:px-5">
            <BackButton href="/user/booking" />
            <p className="text-left text-2xl md:text-3xl font-bold display: inline-flex">
              Rating and Review
            </p>
          </div>
          <div className="mt-[15%] flex flex-col items-center justify-start px-2 md:px-5">
            Trainer Name
            <Image />
          </div>
        </div>
        <div className="w-3/5 flex flex-col h-screen">
          <div className="mt-[15%]"></div>
          <div className="flex-grow overflow-auto">
            <div className="h-full overflow-auto scrollbar-thin scrollbar-thumb-white-300 scrollbar-track-transparent">
              <ReviewBox />
              <ReviewBox />
              <ReviewBox />
              <ReviewBox />
              <ReviewBox />
              <ReviewBox />
              <ReviewBox />
            </div>
          </div>
          <div className="flex justify-end w-full space-x-10 text-start text-lg md:text-xl ">
            <div className="w-1/3 mr-[20%]">
              <Button
                name="Add your review"
                onClick={() => setShowModal(true)}
              />
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative  my-6 mx-auto w-1/2">
                      <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="relative p-6 flex-auto">
                          <div className="flex flex-col">
                            <p className="text-xl text-black text-center">
                              What is your rate ?
                            </p>
                            <div className="flex justify-center flex-row gap-2 my-2">
                              <RatingStar />
                              <RatingStar />
                              <RatingStar />
                              <RatingStar />
                              <RatingStar />
                            </div>
                            <p className="text-xl text-black my-2">
                              Add your review
                            </p>
                            <textarea className="w-full h-20 px-3 py-2 text-base text-gray-700 bg-slate-300 border rounded-lg focus:shadow-outline my-1"></textarea>
                            <div className="flex items-center justify-end  border-solid border-slate-200 rounded-b">
                          <div className="w-1/3">
                            <Button
                              name="submit"
                              onClick={() => setShowModal(false)}
                            />
                          </div>
                        </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Review;

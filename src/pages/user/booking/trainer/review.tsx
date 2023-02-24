import { BackButton } from "@/components/backbutton";
import { Button } from "@/components/button";

const Review = () => {
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
            <p className="text-left text-2xl md:text-3xl font-bold display: inline-flex">Rating and Review</p>
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
              <Button name="Add your review" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;

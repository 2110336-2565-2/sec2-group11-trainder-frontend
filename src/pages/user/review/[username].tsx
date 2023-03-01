import { BackButton } from "@/components/backbutton";
import { Button } from "@/components/button";
import Image from "next/image";

const Review = () => {
  const ReviewBox = () => {
    return (
      <div className="h-[20%] w-[80%] bg-white mb-[5%] border-2 border-gray rounded-3xl items-center justify-between drop-shadow-lg hover:bg-gray-light"></div>
    );
  };

  return (
    <main className="w-full h-screen pt-20 pl-6 flex flex-col bg-backgroundColor">
      <div className="flex items-center mb-3 md:mb-8">
        <BackButton href="/user/booking" />
        <p className="text-xl md:text-3xl mx-5 md:mx-10 font-bold display: inline-flex">
          Rating and Review
        </p>
      </div>
      <div className="flex h-full">
        <div className="w-2/5 flex-col mr-10">
          <div className="flex flex-col items-center justify-start px-2 md:px-5 h-full text-2xl">
            Trainer Name
            <div className="relative w-52 h-52 md:w-60 md:h-60 lg:w-80 lg:h-80 mt-6 md:mt-10 rounded-2xl overflow-hidden">
              <Image
                src="/default_profile.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw"
                style={{ objectFit: "contain"}}
              />
            </div>
          </div>
        </div>
        <div className="w-3/5 flex flex-col mb-10">
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
    </main>
  );
};
export default Review;

import { BackButton } from "@/components/backbutton";
import { Button } from "@/components/button";
import { useState,useEffect } from "react";
import { UserProfile } from "@/services/user.service";
import { getTrainerProfile, TrainerProfile } from "@/services/trainer.service";
import { useRouter } from "next/router";
import { getTrainerReviews, ReviewDetail } from "@/services/trainer.service";
import {StarIcon} from "@heroicons/react/24/outline";

const Review = () => {
  const [showModal, setShowModal] = useState(false);

  const [trainerProfile, setTrainerProfile] = useState<UserProfile>({
    username: "user",
    firstname: "firstname",
    lastname: "lastname",
    birthdate: new Date(),
    citizenId: "none",
    gender: "none",
    phoneNumber: "none",
    address: "none",
    usertype: "none",
    lat: 0,
    lng: 0,
  });

  

  const [trainerReviews, setTrainerReviews] = useState<ReviewDetail[]>([]);

  const router = useRouter();
  const { username } = router.query;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  if (typeof username == "string") {
    getTrainerProfile(username)
      .then((res1) => {
        setTrainerProfile(res1.userProfile);
      })
      .catch(() => router.back())
    // getTrainerReviews(username)
    //   .then((res2) => {
    //     setTrainerReviews(res2.reviewList);
    //   })
    // .catch(() => router.back())
  } else {
    router.back();
  }
}, [username]);

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

  const StarRating = (rating:{ rating: number; }) => {
    return(
      <div className="flex flex-row">
        {[...Array<Number>(Math.round(rating.rating)),].map((e, idx) => {
          return (
            <StarIcon
              key={idx}
              className="h-6 w-6 fill-yellow stroke-yellow"
              strokeWidth={2}
            ></StarIcon>
          );
        })}
        {[...Array<Number>(5 -Math.round(rating.rating)),].map((e, idx) => {
          return (
            <StarIcon
              key={idx}
              className="h-6 w-6 fill-none stroke-yellow"
              strokeWidth={2}
            ></StarIcon>
          );
          })}
      </div>
    )
  }

  const ReviewBox = (review:ReviewDetail) => {
    return (
      <div className="h-[20%] w-[80%] bg-white mb-[5%] border-2 border-gray rounded-3xl items-center justify-between drop-shadow-lg hover:bg-gray-light">
        <div className="m-5">
          <div className="text-lg">
            <StarRating rating={review.rating}></StarRating>
          </div>
          <div className="text-lg">
            comment : {review.comment}
          </div>
        </div>  
      </div>
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
            {trainerProfile.firstname} {trainerProfile.lastname}
            <Image />
          </div>
        </div>
        <div className="w-3/5 flex flex-col h-screen">
          <div className="mt-[15%]"></div>
          <div className="flex-grow overflow-auto">
            <div className="h-full overflow-auto scrollbar-thin scrollbar-thumb-white-300 scrollbar-track-transparent">
              <ReviewBox comment="default comment" createdAt="default address" rating={5} username="default name"/>
              <ReviewBox comment="default comment" createdAt="default address" rating={4.5} username="default name"/>
              <ReviewBox comment="default comment" createdAt="default address" rating={4} username="default name"/>
              <ReviewBox comment="default comment" createdAt="default address" rating={3.5} username="default name"/>
              <ReviewBox comment="default comment" createdAt="default address" rating={3} username="default name"/>
              <ReviewBox comment="default comment" createdAt="default address" rating={2.5} username="default name"/>
              <ReviewBox comment="default comment" createdAt="default address" rating={2} username="default name"/>
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
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Modal Title
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            Test
                          </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Submit
                          </button>
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

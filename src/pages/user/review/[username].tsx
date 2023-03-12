import { BackButton } from "@/components/backbutton";
import { Button } from "@/components/button";
import { useState, useEffect } from "react";
import { UserProfile } from "@/services/user.service";
import { getTrainerProfile, TrainerProfile } from "@/services/trainer.service";
import { useRouter } from "next/router";
import { getTrainerReviews, ReviewDetail } from "@/services/trainer.service";
import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const Review = () => {
  const [showModal, setShowModal] = useState(false);
  // const [rating, setRating] = useState(0);
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
          setLoading(true);
          setTrainerProfile(res1.userProfile);
          setLoading(false);
        })
        .catch(() => router.back());
      getTrainerReviews(username)
        .then((res2) => {
          setLoading(true);
          setTrainerReviews(res2.reviewList);
          setLoading(false);
        })
        .catch(() => router.back());
    } else {
      router.back();
    }
  }, [username]);

  const StarRating = (rating: { rating: number }) => {
    return (
      <div className="flex flex-row">
        {[...Array<Number>(Math.round(rating.rating))].map((e, idx) => {
          return (
            <StarIcon
              key={idx}
              className="h-6 w-6 fill-yellow stroke-yellow"
              strokeWidth={2}
            ></StarIcon>
          );
        })}
        {[...Array<Number>(5 - Math.round(rating.rating))].map((e, idx) => {
          return (
            <StarIcon
              key={idx}
              className="h-6 w-6 fill-none stroke-yellow"
              strokeWidth={2}
            ></StarIcon>
          );
        })}
      </div>
    );
  };

  const ReviewRating = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
      <div className="flex justify-center flex-row gap-2 my-2">
        {[...Array(5)].map((e, index) => {
          index += 1;
          return (
         
              <StarIcon
              key={index}
                className={
                  index <= (hover || rating)
                    ? "cursor-pointer  fill-yellow h-10 w-10 stroke-yellow"
                    : "cursor-pointer fill-none h-10 w-10 stroke-slate-300"
                }
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              />

          );
        })}
      </div>
    );
  };

  const ReviewBox = (review: ReviewDetail) => {
    return (
      <div className="h-[20%] w-[80%] bg-white mb-[5%] border-2 border-gray rounded-3xl items-center justify-between drop-shadow-lg hover:bg-gray-light">
        <div className="m-5">
          <div className="text-lg">
            <StarRating rating={review.rating}></StarRating>
          </div>
          <div className="text-lg">comment : {review.comment}</div>
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
            <div className="max-h-min overflow-hidden mt-6 md:mt-10 flex justify-center">
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
        <div className="w-3/5 flex flex-col h-screen">
          <div className="mt-[15%]"></div>
          <div className="flex-grow overflow-auto">
            <div className="h-full overflow-auto scrollbar-thin scrollbar-thumb-white-300 scrollbar-track-transparent">
              <ReviewBox
                comment="default comment"
                createdAt="default address"
                rating={5}
                username="default name"
              />
              <ReviewBox
                comment="default comment"
                createdAt="default address"
                rating={4.5}
                username="default name"
              />
              <ReviewBox
                comment="default comment"
                createdAt="default address"
                rating={4}
                username="default name"
              />
              <ReviewBox
                comment="default comment"
                createdAt="default address"
                rating={3.5}
                username="default name"
              />
              <ReviewBox
                comment="default comment"
                createdAt="default address"
                rating={3}
                username="default name"
              />
              <ReviewBox
                comment="default comment"
                createdAt="default address"
                rating={2.5}
                username="default name"
              />
              <ReviewBox
                comment="default comment"
                createdAt="default address"
                rating={2}
                username="default name"
              />

              {/*this section error because trainerReviews is empty so comment and other element is undefined*/}
              {/* {trainerReviews[0].createdAt} */}
              {/* {trainerReviews.map((review,idx) => {
              return (
                <div key={idx}>
                  <ReviewBox comment={review.comment} createdAt={review.createdAt} rating={review.rating} username={review.username}/>
                </div>
              );
              })} */}
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
                            <ReviewRating />
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

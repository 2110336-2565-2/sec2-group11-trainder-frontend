import { BackButton } from "@/components/backbutton";
import { Button } from "@/components/button";
import { useState, useEffect } from "react";
import { UserProfile } from "@/services/user.service";
import {
  addTrainerReviews,
  checkReviewable,
  getTrainerProfile,
  ReviewInput,
} from "@/services/trainer.service";
import { useRouter } from "next/router";
import { getTrainerReviews, Review } from "@/services/trainer.service";
import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

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

  const [trainerReviews, setTrainerReviews] = useState<Review[]>([]);

  const router = useRouter();
  const { username } = router.query;
  const [loading, setLoading] = useState<boolean>(true);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const [reviewable, setReviewable] = useState<boolean>(false);

  useEffect(() => {
    if (typeof username === "string") {
      getTrainerProfile(username)
        .then((res) => {
          setLoading(true);
          setTrainerProfile(res.userProfile);
          setLoading(false);
        })
        .catch(() => router.back());

      checkReviewable(username).then((res) => {
        setReviewable(res);
      });
    } else {
      router.back();
    }
  }, [router, username]);

  useEffect(() => {
    if (typeof username === "string") {
      getTrainerReviews(username)
        .then((res) => {
          setLoading(true);
          setTrainerReviews(res);
          setLoading(false);
        })
        .catch(() => router.back());
    } else {
      router.back();
    }
  }, [router, username]);

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
                  ? "cursor-pointer fill-yellow h-10 w-10 stroke-yellow"
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

  const ReviewBox = (review: Review, key: any) => {
    return (
      <div
        className="my-5 bg-white border-2 border-gray rounded-3xl items-center justify-between drop-shadow-lg"
        key={key}
      >
        <div className="m-5">
          <StarRating rating={review.Rating} />
          <div className="text-lg py-2">{review.Comment}</div>
        </div>
      </div>
    );
  };

  const onSubmit = () => {
    const review = {
      comment: comment,
      rating: rating,
      trainerUsername: username,
    } as ReviewInput;
    addTrainerReviews(review).then(() => {
      if (typeof username === "string") {
        getTrainerReviews(username)
          .then((res) => {
            setLoading(true);
            setTrainerReviews(res);
            setLoading(false);
          })
          .catch(() => router.back());

        checkReviewable(username).then((res) => {
          setReviewable(res);
        });
      }
    });

    setRating(0);
    setComment("");
  };

  return (
    <main className="w-full h-screen pt-20 pl-6 flex flex-col bg-backgroundColor overflow-hidden ">
      {!loading && (
        <>
          <div className="flex items-center mb-3 md:mb-8">
            <BackButton />
            <p className="text-xl md:text-3xl mx-5 md:mx-10 font-bold display: inline-flex">
              Rating and Review
            </p>
          </div>
          <div className="flex h-full">
            <div className="w-2/5 flex-col mr-10">
              <div className="flex flex-col items-center justify-start px-2 md:px-5 h-full text-2xl">
                {trainerProfile.firstname} {trainerProfile.lastname}
                <div className="relative w-52 h-52 md:w-60 md:h-60 lg:w-80 lg:h-80 mt-6 md:mt-10 rounded-2xl overflow-hidden">
                  <Image
                    src="/default_profile.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
            <div className="w-3/5 h-full flex flex-col">
              <div className="h-4/6 overflow-y-auto px-10 mb-8">
                {trainerReviews !== undefined && trainerReviews.length > 0 ? (
                  <>
                    {trainerReviews.map((review, index) => {
                      return (
                        <ReviewBox
                          key={index}
                          Comment={review.Comment}
                          CreatedAt={review.CreatedAt}
                          Rating={review.Rating}
                          Username={review.Username}
                        />
                      );
                    })}
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-xl">
                    No reviews about this trainer
                  </div>
                )}
              </div>

              <div className="flex justify-end w-full px-8">
                <Button
                  name="Add your review"
                  width="w-2/3 md:w-1/3"
                  onClick={() => setShowModal(true)}
                  disabled={!reviewable}
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
                              <textarea
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full h-20 px-3 py-2 text-base text-gray-700 bg-slate-300 border rounded-lg focus:shadow-outline my-1"
                              ></textarea>
                              <div className="flex items-center justify-end space-x-5 border-solid border-slate-200 rounded-b">
                                <Button
                                  name="cancel"
                                  width="w-1/4"
                                  onClick={() => setShowModal(false)}
                                />
                                <Button
                                  name="submit"
                                  width="w-1/4"
                                  onClick={() => {
                                    setShowModal(false);
                                    onSubmit();
                                  }}
                                />
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
        </>
      )}
    </main>
  );
};
export default Review;

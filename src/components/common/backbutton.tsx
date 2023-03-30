import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

type ButtonProps = {
  mx?: string;
};

export const BackButton = (props: ButtonProps) => {
  const router = useRouter();
  return (
    <button onClick={()=> router.back()} className={props.mx}> 
      <ArrowLeftIcon
        className="h-10 w-10 md:h-12 md:w-12 hover:bg-pink-light rounded-xl p-2"
        strokeWidth={3}
      ></ArrowLeftIcon>
    </button>
  );
};

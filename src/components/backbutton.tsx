import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { UrlObject } from "url";

type ButtonProps = {
  href: string | UrlObject;
  mx?: string;
};

export const BackButton = (props: ButtonProps) => {
  return (
    <Link href={props.href} className={props.mx}>
      <ArrowLeftIcon
        className="h-10 w-10 md:h-12 md:w-12 hover:bg-pink-light rounded-xl p-2"
        strokeWidth={3}
      ></ArrowLeftIcon>
    </Link>
  );
};

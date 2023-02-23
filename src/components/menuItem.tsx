import Link from "next/link";
import { ReactNode } from "react";

type MenuItemProps = {
  text: string;
  href: string;
  icon: ReactNode;
};

export const MenuItem = (props: MenuItemProps) => {
  return (
    <Link
      className="flex flex-col w-72 ustify-center items-center gap-2 bg-white py-5 rounded-xl shadow-lg hover:cursor-pointer hover:bg-gray-100"
      href={props.href}
    >
      {props.icon}
      <h1 className="text-xl px-10 py-2">{props.text}</h1>
    </Link>
  );
};

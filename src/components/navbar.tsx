import { getCurrentUser, logout } from "@/services/auth.service";
import {
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  ChevronDownIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";

const navLinks = [
  {
    name: "Home",
    path: "/user/home",
    icon: <HomeIcon className="mx-2 h-6 w-6 " strokeWidth={2} />,
  },
  {
    name: "Notification",
    path: "/user/notification",
    icon: <BellIcon className="mx-2 h-6 w-6" strokeWidth={2} />,
  },
  {
    name: "Chat",
    path: "/user/chat",
    icon: (
      <ChatBubbleLeftEllipsisIcon className="mx-2 h-6 w-6" strokeWidth={2} />
    ),
  },
];

export const NavBar = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdown = useRef<any>(null);

  const profileMenu = [
    {
      name: "profile",
      onclick: () => router.push("/account/profile"),
    },
    {
      name: "logout",
      onclick: useCallback(() => {
        logout();
        router.push("/");
      }, []),
    },
  ];

  return (
    <>
      <nav className="bg-blue flex px-6">
        <div className="flex items-center mr-10 justify-evenly">
          <p className="text-backgroundColor text-3xl mx-2 font-lexend-exa">
            Trainder
          </p>
          <img
            src="/trainder.png"
            alt=""
            className="object-contain h-16 w-16"
          />
        </div>
        <ul className="w-1/3 flex items-center justify-around">
          {navLinks.map((link, index) => {
            return (
              <li key={index}>
                <Link
                  href={link.path}
                  key={index}
                  className={
                    "inline-flex items-center text-lg hover:underline " +
                    (router.asPath === link.path ? "text-yellow" : "text-white")
                  }
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="w-3/5 flex justify-end items-center">
          <div className="flex flex-col">
            <button
              type="button"
              className="text-white inline-flex items-center text-lg hover:underline"
              onClick={() => setShowDropdown((state) => !state)}
            >
              <UserCircleIcon className="h-6 w-6 mx-2" strokeWidth={2} />
              {getCurrentUser().username ?? "Username"}

              <ChevronDownIcon className="h-6 w-6 mx-2" strokeWidth={2} />
            </button>
            {showDropdown && (
              <div ref={dropdown}>
                <ul className="block z-10 absolute bg-white m-2 shadow rounded-xl border border-gray-light">
                  {profileMenu.map((menu, index) => {
                    return (
                      <li
                        key={index}
                        className="hover:text-white hover:bg-black hover:cursor-pointer py-2 px-8 rounded-xl"
                        onClick={menu.onclick}
                      >
                        {menu.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

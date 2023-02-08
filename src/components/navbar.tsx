import { getCurrentUser, logout } from "@/services/auth.service";
import { Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  ChevronDownIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useCallback } from "react";

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
  const profileMenu = [
    {
      name: "profile",
      onclick: () => router.push("/account/profile"),
      color: "black",
    },
    {
      name: "logout",
      onclick: useCallback(() => {
        logout();
        router.push("/");
      }, []),
      color: "pink-dark",
    },
  ];

  return (
    <>
      <nav className="bg-blue flex px-6 py-1">
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
            <Menu>
              <Menu.Button>
                <div className="inline-flex items-center text-lg text-white">
                  <UserCircleIcon className="h-6 w-6 mx-2" strokeWidth={2} />
                  {getCurrentUser().username ?? "Username"}
                  <ChevronDownIcon className="h-6 w-6 mx-2" strokeWidth={2} />
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-5 z-10 mt-10 w-56 px-2 origin-top-right rounded-xl bg-white shadow-lg">
                  {profileMenu.map((menu, index) => {
                    return (
                      <Menu.Item>
                        <button
                          className={`w-full text-start hover:text-white hover:bg-${menu.color} hover:cursor-pointer py-2 px-4 my-1 rounded-xl`}
                          onClick={menu.onclick}
                        >
                          {menu.name}
                        </button>
                      </Menu.Item>
                    );
                  })}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </nav>
    </>
  );
};

import { getCurrentUser, logout } from "@/services/auth.service";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  ChevronDownIcon,
  HomeIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
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
      color: "gray-dark",
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
      <Disclosure as="nav" className="bg-blue absolute w-full z-10">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="left-0 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-xl p-2 text-white hover:bg-blue-dark">
                    {open ? (
                      <XMarkIcon
                        className="block h-6 w-6"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon
                        className="block h-6 w-6"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center">
                  <div className="flex items-center mr-5">
                    <p className="text-backgroundColor text-2xl mx-0 font-lexend-exa block lg:block md:hidden md:text-3xl md-2">
                      Trainder
                    </p>
                    <img
                      src="/trainder.png"
                      alt=""
                      className="object-contain h-12 w-12 md:h-16 md:w-16"
                    />
                  </div>
                  <div className="hidden md:block">
                    {navLinks.map((link, index) => {
                      return (
                        <a
                          key={index}
                          href={link.path}
                          className={
                            "inline-flex items-center text-lg hover:bg-blue-dark mx-2 pl-2 pr-4 py-2 rounded-xl " +
                            (router.asPath === link.path
                              ? "text-yellow"
                              : "text-white")
                          }
                        >
                          {link.icon}
                          {link.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div className="right-0 flex flex-col items-center">
                  <Menu>
                    <Menu.Button>
                      <div className="inline-flex items-center text-lg text-white rounded-xl p-2 hover:bg-blue-dark">
                        <UserCircleIcon
                          className="h-6 w-6 mx-2"
                          strokeWidth={2}
                        />
                        {getCurrentUser().username ?? "Username"}
                        <ChevronDownIcon
                          className="h-6 w-6 mx-2"
                          strokeWidth={2}
                        />
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
                      <Menu.Items className="absolute right-5 z-20 mt-10 w-56 px-2 py-1 origin-top-right rounded-xl bg-white shadow-lg">
                        {profileMenu.map((menu, index) => {
                          return (
                            <Menu.Item key={index}>
                              <button
                                className={`w-full text-start hover:text-white ${
                                  menu.color != null
                                    ? `hover:bg-${menu.color}`
                                    : "hover:bg-gray-dark"
                                } hover:cursor-pointer py-2 px-4 my-1 rounded-xl`}
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
            </div>

            <Disclosure.Panel className="block md:hidden">
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="space-y-1 px-2 pt-2 pb-3">
                  {navLinks.map((link) => (
                    <Disclosure.Button
                      key={link.name}
                      as="a"
                      href={link.path}
                      className={
                        "flex items-center text-lg mx-2 p-2 rounded-xl hover:bg-blue-dark " +
                        (router.asPath === link.path
                          ? "text-yellow"
                          : "text-white")
                      }
                    >
                      {link.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Transition>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

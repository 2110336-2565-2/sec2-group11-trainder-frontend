import { getCurrentUser } from "@/services/auth.service";
import {
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const navLinks = [
    {
      name: "Home",
      path: "/",
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

const TrainerFilter = () => {
    const router = useRouter();
    return <>
    <div>
        {/* <p>test</p>
        Hello meeen */}
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
        <div className="w-2/3 inline-flex items-center text-lg justify-end">
          <UserCircleIcon  className="text-white h-6 w-6 mx-2" strokeWidth={2}/>
          <p className="text-white">{getCurrentUser().username ?? 'Username'}</p>
        </div>
      </nav>
    </div>
    
    </>;
}

export default TrainerFilter;

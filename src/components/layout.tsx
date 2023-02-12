import { useRouter } from "next/router";
import { NavBar } from "./navbar";

export const Layout = ({ children }: React.PropsWithChildren) => {
  const hideNavbar = ["/", "/account/signup", "/account/info"];
  const router = useRouter();
  return (
    <>
      {!hideNavbar.includes(router.pathname) && <NavBar />}
      <main>{children}</main>
    </>
  );
};

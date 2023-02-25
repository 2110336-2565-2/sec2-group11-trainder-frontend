import { useRouter } from "next/router";
import { NavBar } from "./navbar";

export const Layout = ({ children }: React.PropsWithChildren) => {
  const hideNavbar = ["/", "/account/signup", "/account/info", "/_error"];
  const router = useRouter();
  return (
    <>
      {!hideNavbar.includes(router.pathname) && <NavBar />}
      <main>{children}</main>
    </>
  );
};

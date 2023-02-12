import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { checkLoggedIn } from "@/services/auth.service";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    // On route change hide content
    router.events.on("routeChangeStart", hideContent);
    // On route change complete auth check
    router.events.on("routeChangeComplete", authCheck);

    // Unsubscribe
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  // Check if that path is protected, then check if the user is logged in
  const authCheck = (url: string) => {
    const publicPaths = ["/", "/account/signup"];
    const path = url.split("?")[0];
    checkLoggedIn().then((loggedIn) => {
      console.log(loggedIn);
      if (!loggedIn && !publicPaths.includes(path)) {
        setAuthorized(false);
        router.push({
          pathname: "/",
          query: { returnUrl: router.asPath },
        });
      }
      setAuthorized(true);
    });
  };

  return (
    <>
      <Head>
        <title>Trainder</title>
        <link rel="icon" href="/trainder_icon.png" />
      </Head>
      {authorized && <Component {...pageProps} />}
    </>
  );
}

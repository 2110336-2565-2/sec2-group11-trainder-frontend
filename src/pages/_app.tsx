import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { checkLoggedIn } from "@/services/auth.service";
import { Layout } from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean>(false);

  // Check if that path is protected, then check if the user is logged in
  const authCheck = useCallback(
    (url: string) => {
      const publicPaths = ["/", "/account/signup"];
      const path = url.split("?")[0];
      checkLoggedIn().then((loggedIn) => {
        if (!loggedIn && !publicPaths.includes(path)) {
          setAuthorized(false);
          router.push({
            pathname: "/",
            query: { returnUrl: router.asPath },
          });
        }
        setAuthorized(true);
      });
    },
    [router]
  );

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
  }, [authCheck, router.asPath, router.events]);

  return (
    <>
      <Head>
        <title>Trainder</title>
        <link rel="icon" href="/trainder_icon.png" />
      </Head>
      <Layout>{authorized && <Component {...pageProps} />}</Layout>
    </>
  );
}

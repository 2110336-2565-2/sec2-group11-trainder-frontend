import Head from "next/head";
import Login from "./account/login";

export default function Home() {
  return (
    <>
      <Head>
        <title>Trainder</title>
        <link rel="icon" href="/trainder_icon.png" />
      </Head>
      <Login/>
    </>
  );
}



import axios from "axios";
import Head from "next/head";
import Footer from "../frontend/components/Footer";
import HeroImage from "../frontend/components/HeroImage";
import HomeMainContent from "../frontend/components/HomeMainContent";
import MainNavBar from "../frontend/components/MainNavBar";
import { HOSTNAME } from "./_app";

export default function Home({ orchestra }: any) {
  return (
    <>
      <Head>
        <title>Red de Orquestas Populares de Música Latinoamericana</title>
      </Head>
      <MainNavBar />
      <HeroImage />
      <HomeMainContent orchestra={orchestra} />
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${HOSTNAME}/api/orchestra`);
  const orchestra = await res.data.data;

  return {
    props: {
      orchestra,
    },
  };
};

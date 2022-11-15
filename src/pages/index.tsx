import axios from "axios";
import Head from "next/head";
import Footer from "../frontend/components/Footer";
import HeroImage from "../frontend/components/HeroImage";
import HomeMainContent from "../frontend/components/HomeMainContent";
import MainNavBar from "../frontend/components/MainNavBar";
import { useUser } from '@auth0/nextjs-auth0'

export default function Home(props: any) {

  const { user, error, isLoading } = useUser()
  console.log(user)
  return (
    <>
      <Head>
        <title>Red de Orquestas Populares de Música Latinoamericana</title>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
        </style>
      </Head>
      <MainNavBar />
      <HeroImage />
      <HomeMainContent orchestra={props.orchestra} />
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/orchestra");
  const orchestra = await res.data;

  return {
    props: {
      orchestra,
    },
  };
};

import DeveloperMember  from '../frontend/components/AboutDevelopers';
import axios from "axios";
import Head from "next/head";
import Footer from "../frontend/components/Footer";
import { HOSTNAME } from "./_app";



export default function AboutDev(props: any) {
  return (
    <>
      <Head>
        <title>Red de Orquestas Populares de Música Latinoamericana</title>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
        </style>
      </Head>
      <DeveloperMember/>
      <Footer />
    </>
  );
}




import DeveloperMember  from '../frontend/components/AboutDevelopers';
import Head from "next/head";
import Footer from "../frontend/components/Footer";
import { HOSTNAME } from "./_app";
import HomeCards from '../frontend/components/HomeCards';
import { Developers } from "../frontend/utils/fakeDB";


export default function AboutDev(props: any) {
  return (
    <>
      <Head>
        <title>Red de Orquestas Populares de Música Latinoamericana</title>
      </Head>
      { Developers?.map((e)=> {
        return(
          <DeveloperMember 
          pic= {e.pic}
          name= {e.name}
          team= {e.team}
          description= {e.description}
          GitUrl= {e.GitUrl}
          LinkUrl= {e.LinkUrl}
          />
        )
      }) }
      <Footer />
    </>
  );
}




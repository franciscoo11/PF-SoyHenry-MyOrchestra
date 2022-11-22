import axios from "axios";
import Head from "next/head";
import Footer from "../frontend/components/Footer";
import HeroImage from "../frontend/components/HeroImage";
import HomeMainContent from "../frontend/components/HomeMainContent";
import MainNavBar from "../frontend/components/MainNavBar";
import { HOSTNAME } from "./_app";


export default function Home(props: any) {
  console.log('jejeeeee')
  console.log(props.images)
  console.log()
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
      <HomeMainContent orchestra={props.orchestra} images={props.images}/>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${HOSTNAME}/api/orchestra`);
  const orchestra = await res.data;

  const results = await axios(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_ClOUD_NAME}/resources/image`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ':' +
            process.env.CLOUDINARY_API_SECRET
        ).toString('base64')}`,
      }
    }
  )
  console.log("results are", results);
  console.log('jeje')

  const { resources } = results.data;
  const images = resources.map((resource: any) => {
    const { width, height } = resource;
    return {
      id: resource.asset_id,
      title: resource.public_id,
      image: resource.secure_url,
      width,
      height,
    };
  });

  return {
    props: {
      orchestra,images
    },
  };
};


// export async function getStaticProps() {
//   const results = await fetch(
//     `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_ClOUD_NAME}/resources/image`,
//     {
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           process.env.CLOUDINARY_API_KEY +
//             ':' +
//             process.env.CLOUDINARY_API_SECRET
//         ).toString('base64')}`,
//       }
//     }
//   ).then((r:any) => r.json());
//   console.log("results are", results);
//   console.log('jeje')

//   const { resources } = results;
//   const images = resources.map((resource: any) => {
//     const { width, height } = resource;
//     return {
//       id: resource.asset_id,
//       title: resource.public_id,
//       image: resource.secure_url,
//       width,
//       height,
//     };
//   });
//   return {
//     props: {
//       images,
//     },
//   };
// }

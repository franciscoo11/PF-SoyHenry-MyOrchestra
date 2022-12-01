import DeveloperMember from "../frontend/components/AboutDevelopers";
import Head from "next/head";
import Footer from "../frontend/components/Footer";
import { HOSTNAME } from "./_app";
import HomeCards from "../frontend/components/HomeCards";
import { Developers } from "../frontend/utils/fakeDB";
import MainNavBar from "../frontend/components/MainNavBar";
import styled from "styled-components";

const ViewStyles = styled.div`
  margin: 25px auto;
  width: 120%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 24px;
  padding: 0 80px;
  .cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
    height: 50%;
  }
`;
export default function AboutDev(props: any) {
  return (
    <>
      <MainNavBar />
      <ViewStyles>
        <Head>
          <title>Red de Orquestas Populares de Música Latinoamericana</title>
        </Head>
        <div className="cards">
          {Developers.map((e) => {
            return (
              <DeveloperMember
                pic={e.pic}
                name={e.name}
                team={e.team}
                GitUrl={e.GitUrl}
                LinkUrl={e.LinkUrl}
              />
            );
          })}
        </div>
      </ViewStyles>
      <Footer />
    </>
  );
}

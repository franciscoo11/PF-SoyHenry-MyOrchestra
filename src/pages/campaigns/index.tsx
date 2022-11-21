import Head from "next/head";
import MainNavBar from "../../frontend/components/MainNavBar";
import CampaignCards from "../../frontend/components/CampaignCards";
import styled from "styled-components";
import axios from "axios";
import Footer from "../../frontend/components/Footer";
import { HOSTNAME } from "../_app";

const StyledMain = styled.main`
  margin: 25px auto;
  width: 90%;
  max-width: 1300px;
  display: flex;
  gap: 20px;

  section {
    width: 100%;
  }

  .filtros {
    margin: 15px 0;
    display: flex;
    justify-content: flex-end;
  }
  .campañas {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
  }
  .paginacion {
    margin: 15px 0;
    display: flex;
    justify-content: center;
  }
`;

const Campañas = ({ campaign }: any) => {
  return (
    <>
      <Head>
        <title>
          Campañas benéficas para Orquestas Populares Latinoamericanas
        </title>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
        </style>
      </Head>
      <MainNavBar />
      <StyledMain>
        <section>
          <div className="filtros">
            <select name="orderBy" id="orderBy">
              <option value="Ordenar por:">Ordenar por:</option>
              <option value="Nombre">Nombre</option>
              <option value="Ciudad">Ciudad</option>
            </select>
          </div>
          <div className="campañas">
            {campaign.map((campaign: any, index: number) => (
              <CampaignCards
                key={index}
                image={campaign.media}
                title={campaign.title}
                goal_amount={campaign.goal_amount}
              />
            ))}
          </div>
          <div className="paginacion">
            <button>Anterior</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>Siguiente</button>
          </div>
        </section>
      </StyledMain>
      <Footer />
    </>
  );
};

export default Campañas;

export const getServerSideProps = async () => {
  const res = await axios.get(`${HOSTNAME}/api/campaign`);
  const campaign = await res.data;

  return {
    props: {
      campaign,
    },
  };
};

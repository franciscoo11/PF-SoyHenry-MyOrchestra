import Head from "next/head";
import MainNavBar from "../frontend/components/MainNavBar";
import HomeCards from "../frontend/components/HomeCards";
import styled from "styled-components";
import axios from "axios";
import Footer from "../frontend/components/Footer";

const StyledMain = styled.main`
  margin: 25px auto;
  width: 90%;
  max-width: 1300px;
  display: flex;
  gap: 20px;

  section {
    width: 100%;

    .filters-container {
      margin: 15px 0;
      display: flex;
      justify-content: flex-end;

      /* Dropdown Button */
      .dropbtn {
        padding: 12px;
        font-size: 12px;
        border: 1px solid lightgray;
        border-radius: 12px;
        font-weight: bold;
        background-color: white;
      }

      /* The container <div> - needed to position the dropdown content */
      .dropdown {
        position: relative;
        display: inline-block;
      }

      /* Dropdown Content (Hidden by Default) */
      .dropdown-content {
        display: none;
        position: absolute;
        min-width: 120px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        font-size: 0.8em;
      }

      /* Links inside the dropdown */
      .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        background-color: white;
      }

      /* Change color of dropdown links on hover */
      .dropdown-content a:hover {
        background-color: #f1f2f6;
        cursor: pointer;
      }

      /* Show the dropdown menu on hover */
      .dropdown:hover .dropdown-content {
        display: block;
      }

      /* Change the background color of the dropdown button when the dropdown content is shown */
      .dropdown:hover .dropbtn {
        background-color: #f1f2f6;
      }
    }

    .orquestas {
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
  }
`;

export default function Orquestas({ orchestra }: any) {
  return (
    <>
      <Head>
        <title>Listado de Orquestas Populares de Música Latinoamericana</title>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
        </style>
      </Head>
      <MainNavBar />
      <StyledMain>
        <section>
          <div className="filters-container">
            <div className="dropdown">
              <button className="dropbtn">Ordernar por:</button>
              <div className="dropdown-content">
                <a className="filter-option">Nombre Asc</a>
                <a className="filter-option">Nombre Desc</a>
                <a className="filter-option">Ciudad Asc</a>
                <a className="filter-option">Ciudad Desc</a>
              </div>
            </div>
          </div>
          <div className="orquestas">
            {orchestra.map((orquesta: any, index: number) => (
              <HomeCards
                key={orquesta.id}
                id={orquesta.id}
                title={orquesta.name}
                subtitle={orquesta.location}
                content={orquesta.description.substr(0, 150)}
                image={orquesta.logo}
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

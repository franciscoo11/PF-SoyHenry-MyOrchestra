import Head from "next/head";
import OrchestraCards from "../../frontend/components/admin/orchestraCard";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Swal from "sweetalert2";

const StyledMain = styled.main`
  width: 90%;
  max-width: 1440px;
  background-color: #f5f5f5;
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  gap: 12px;
  margin: 24px auto;

  .content {
    margin: 24px auto;
    grid-column: 1/10;
    display: grid;
    grid-template-columns: repeat(9, minmax(0, 1fr));
    gap: 24px;

    .filters-container {
      grid-column: 1/10;
      display: flex;
      justify-content: space-evenly;
    }

    .orquestas {
      grid-column: 1/10;
      display: grid;
      grid-template-columns: repeat(9, minmax(0, 1fr));
      gap: 24px;

      .heads-container {
        grid-column: 1/10;
        display: grid;
        grid-template-columns: repeat(9, minmax(0, 1fr));
        gap: 24px;
        background-color: gray;
        padding: 12px;
        font-weight: bold;
        color: white;
        position: sticky;
        top: 52px;

        .logo {
          grid-column: 2/3;
          display: flex;
          align-items: center;
          img {
            width: 48px;
            height: auto;
          }
        }

        .info {
          grid-column: 3/7;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          div {
            display: flex;
            justify-content: center;
          }
        }

        .actions {
          grid-column: 8/9;
          display: flex;
          align-items: center;
        }
      }
      .list-container {
        grid-column: 1/10;
      }
    }
  }
`;

export default function AdminOrchestras({ orchestraTypes }: any) {
  const [orchestras, setOrchestras] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState("");
  const itemsPerPage = 4;
  const router = useRouter();
  const searchQuery = router.asPath.split("?").pop();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/orchestra?admin=true&${searchQuery}&resources=100`)
      .then((res) => setOrchestras(res.data))
      .finally(() => setLoading(false))
      .catch(() => {
        Swal.fire({
          title: "<strong> <u>No hay orquestas</u></strong>",
          icon: "error",
          allowOutsideClick: false,
          focusConfirm: true,
          timer: 2500,
          confirmButtonText: '<a href="/bannedPage">Ok</a>',
        }).then(() => {
          window.location.href = "/admin";
        });
      });
  }, [searchQuery]);

  const { data = [], results = 1 }: any = orchestras;
  let pages = Math.ceil(results / itemsPerPage);

  const nextPage = () => {
    if (currentPage < pages - 1) {
      router.push(
        {
          pathname: "/admin/orchestras",
          query: { ...router.query, page: currentPage + 1 },
        },
        undefined,
        {}
      );
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      router.push(
        {
          pathname: "/admin/orchestras",
          query: { ...router.query, page: currentPage - 1 },
        },
        undefined,
        {}
      );
      setCurrentPage(currentPage - 1);
    }
  };

  function nameSortDesc() {
    router.push(
      {
        pathname: "/admin/orchestras",
        query: { ...router.query, order: "desc", page: 0 },
      },
      undefined,
      {}
    );
    setCurrentPage(0);
  }

  function nameSortAsc() {
    router.push(
      {
        pathname: "/admin/orchestras",
        query: { ...router.query, order: "asc", page: 0 },
      },
      undefined,
      {}
    );
    setCurrentPage(0);
  }

  function typeFilterHandler(id: string) {
    router.push(
      {
        pathname: "/admin/orchestras",
        query: { ...router.query, orchestra_TypeId: id, page: 0 },
      },
      undefined,
      {}
    );
    setCurrentPage(0);
  }

  function resetHandler() {
    router.push(
      {
        pathname: "/admin/orchestras",
      },
      undefined,
      {}
    );
    setCurrentPage(0);
  }

  return (
    <>
      <Head>
        <title>Dashboard - Orquestas Populares de Música Latinoamericana</title>
      </Head>
      <StyledMain>
        <section className="content">
          {/* <div className="filters-container">
            <div className="dropdown">
              <button className="dropbtn">Tipo de Orquesta</button>
              <div className="dropdown-content">
                {orchestraTypes.map((orchestraType: any) => {
                  const { id, type } = orchestraType;
                  return (
                    <a
                      className="filter-option"
                      key={id}
                      onClick={() => typeFilterHandler(id)}
                    >
                      {type}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">Ordenar por:</button>
              <div className="dropdown-content">
                <a className="filter-option" onClick={nameSortAsc}>
                  Nombre Asc
                </a>
                <a className="filter-option" onClick={nameSortDesc}>
                  Nombre Desc
                </a>
              </div>
            </div>
            <div className="dropdown">
              <button className="reset-btn" onClick={resetHandler}>
                Restablecer
              </button>
            </div>
          </div> */}
          <div className="orquestas">
            <div className="heads-container">
              <div className="logo">LOGO</div>
              <div className="info">
                <div className="nombre">ORQUESTA</div>
                <div className="pais">PAIS</div>
              </div>
              <div className="actions">ACCIONES</div>
            </div>
            <div className="list-container">
              {loading ? (
                <p className="loading-msg">Loading...</p>
              ) : data.length > 0 ? (
                data.map((orquesta: any, index: number) => (
                  <OrchestraCards
                    key={orquesta.id}
                    id={orquesta.id}
                    title={orquesta.name}
                    subtitle={orquesta.location}
                    content={orquesta.description.substr(0, 150)}
                    image={orquesta.logo}
                    is_active={orquesta.is_active}
                    // handleClickLogicDelete={handleClickLogicDelete}
                  />
                ))
              ) : (
                <p className="search-alert">Sin coincidencias</p>
              )}
            </div>
          </div>
          {/* <div className="paginacion">
            <button
              className="nav-btn"
              onClick={prevPage}
              disabled={currentPage === 0}
            >
              Anterior
            </button>
            <button
              className="nav-btn"
              onClick={nextPage}
              disabled={currentPage >= pages - 1}
            >
              Siguiente
            </button>
          </div> */}
        </section>
      </StyledMain>
    </>
  );
}

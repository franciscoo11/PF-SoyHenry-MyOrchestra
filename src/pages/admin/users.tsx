import Head from "next/head";
import UserCard from "../../frontend/components/admin/userCard";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { prisma } from "../../../lib/prisma";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import NavAdmin from "../../frontend/components/admin/navAdmin";

const StyledMain = styled.main`
  margin: 25px auto;
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  gap: 24px;
  padding: 0 80px;

  .content {
    grid-column: 1/17;

    .nav-btn {
      padding: 12px;
      font-size: 12px;
      border: 1px solid lightgray;
      border-radius: 12px;
      font-weight: bold;
      background-color: white;
      margin: 12px;

      :hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.secondary};
        color: white;
        &:disabled {
          cursor: unset;
          color: lightgray;
          background-color: white;
        }
      }

      :disabled {
        cursor: unset;
        color: lightgray;
      }
    }

    .filters-container {
      margin: 24px 0;
      display: flex;
      justify-content: center;
      gap: 24px;

      .dropbtn,
      .reset-btn {
        padding: 12px;
        font-size: 12px;
        border: 1px solid lightgray;
        border-radius: 12px;
        font-weight: bold;
        background-color: white;
      }

      .reset-btn {
        :hover {
          cursor: pointer;
          background-color: ${({ theme }) => theme.colors.secondary};
          color: white;
        }
      }

      .dropdown {
        position: relative;
        display: inline-block;
      }

      .dropdown-content {
        display: none;
        position: absolute;
        min-width: 120px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        font-size: 0.8em;
      }

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
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 24px;

      .search-alert,
      .loading-msg {
        grid-column: 1/5;
        margin: 242px auto;
        font-size: 2em;
      }
    }

    .paginacion {
      margin: 15px 0;
      display: flex;
      justify-content: center;
    }
  }
`;

export default function AdminUser(props: any) {
  const [users, setUsers] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  //   const itemsPerPage = 4;
  const router = useRouter();
  //   const searchQuery = router.asPath.split("?").pop();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/user`)
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false))
      .catch(() => {
        Swal.fire({
          title: "<strong> <u>No hay users</u></strong>",
          icon: "error",
          allowOutsideClick: false,
          focusConfirm: true,
          timer: 2500,
          confirmButtonText: '<a href="/bannedPage">Ok</a>',
        }).then(() => {
          window.location.href = "/admin";
        });
      });
  }, []);

  return (
    <>
      <Head>
        <title>Listado de Usuarios</title>
      </Head>
      <NavAdmin />
      <StyledMain>
        <section className="content">
          <div className="orquestas">
            {loading ? (
              <p className="loading-msg">Loading...</p>
            ) : users.length > 0 ? (
              users.map((user: any, index: number) => (
                <UserCard
                  key={user.id}
                  email={user.email}
                  pic={user.pic}
                  role={user.role}
                  name={user.name}
                  is_active={user.is_active}
                />
              ))
            ) : (
              <p className="search-alert">Sin coincidencias</p>
            )}
          </div>
        </section>
      </StyledMain>
    </>
  );
}

// export async function getServerSideProps() {
//   const orchestraTypes = await prisma.orchestra_type.findMany();
//   return {
//     props: { orchestraTypes },
//   };
// }

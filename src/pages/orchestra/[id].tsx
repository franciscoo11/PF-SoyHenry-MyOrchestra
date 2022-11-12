import { useRouter } from "next/router";
import Cover from "../../frontend/components/Cover";
import MainNavBar from "../../frontend/components/MainNavBar";
import { Orquestas, Posts, Users } from "../../frontend/utils/fakeDB";
import styled from "styled-components";
import OrchestraPosts from "../../frontend/components/OrchestraPosts";

export const StyledMain = styled.main`
  margin: 25px auto;
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  gap: 24px;
  padding: 0 80px;

  .aside-left {
    grid-column: 1/4;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .orchestra-nav-container {
      .orchestra-logo {
        width: 110px;
        height: 110px;
        margin: 0 auto;
        border: 2px solid lightgrey;
        border-radius: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        z-index: 100;
      }

      .orchestra-nav {
        margin-top: -55px;
        border: 1px solid lightgrey;
        padding: 80px 24px;
        border-radius: 10px 10px 0px 50%;
        position: relative;
        z-index: -100;

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          text-transform: uppercase;
          font-size: 0.8em;

          .nav-item {
            padding: 8px 0 8px 60px;
            border-bottom: 1px solid lightgrey;

            :last-child {
              border-bottom: none;
            }
          }
        }
      }
    }

    .notification-container {
      background-color: #f1f2f6;
      border-radius: 6px;
      border: 1px solid lightgrey;
      padding-top: 16px;
      position: relative;

      .admin-pic {
        width: 90px;
        height: 90px;
        border-radius: 100%;
        margin: 0 auto;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        z-index: 100;
      }

      .notification-content {
        margin-top: -45px;
        background-color: white;
        padding: 60px 18px 12px;
        border-top: 1px solid lightgrey;
        text-align: center;
        position: relative;

        p {
          margin: 0;
        }

        .user-name {
          font-weight: bold;
        }

        .user-role {
          font-size: 0.9em;
        }

        hr {
          border: 1px solid lightgrey;
        }

        .notifications-list {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: initial;

          .notification-item {
            font-size: 0.9em;
            padding: 6px 0;

            span {
              font-weight: bold;
              float: right;
            }
          }
        }
      }
    }
  }

  section {
    grid-column: 4/13;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .form-container {
      border: 1px solid lightgrey;
      padding: 24px;
      border-radius: 12px;
      display: flex;
      gap: 12px;

      .post-form {
        width: 100%;
      }

      .post-input {
        background-color: #f1f2f6;
        border: none;
        font-size: 1em;
        width: 100%;
        padding: 12px;
        border-radius: 24px;
      }

      .pic {
        border: 1px solid lightgrey;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background-size: cover;
        background-position: center;
      }
    }

    .filter-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .divider {
        width: 100%;
        height: 1px;
        background-color: lightgrey;
      }

      .post-filter {
        width: 320px;
        text-align: right;
      }
    }

    .posts {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }

  .aside-right {
    grid-column: 13/17;
  }
`;

function OrchestraDetails(props: any) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <div className="orchestra-nav-container">
            <div
              className="orchestra-logo"
              style={{ backgroundImage: `url(${Orquestas[0].logo})` }}
            ></div>
            <nav className="orchestra-nav">
              <ul className="nav-list">
                <li className="nav-item">Inicio</li>
                <li className="nav-item">Acerca de</li>
                <li className="nav-item">Integrantes</li>
                <li className="nav-item">Noticias</li>
                <li className="nav-item">Multimedia</li>
                <li className="nav-item">Archivos</li>
                <li className="nav-item">Eventos</li>
                <li className="nav-item">Campañas</li>
              </ul>
            </nav>
          </div>
          <div className="notification-container">
            <div
              className="admin-pic"
              style={{ backgroundImage: `url(${Users[1].image})` }}
            ></div>
            <div className="notification-content">
              <p className="user-name">{Users[1].name}</p>
              <p className="user-role">{Users[1].rol}</p>
              <hr />
              <ul className="notifications-list">
                <li className="notification-item">
                  Notificaciones <span>3</span>{" "}
                </li>
                <li className="notification-item">
                  Mensajes <span>2</span>{" "}
                </li>
                <li className="notification-item">
                  Pendiente <span>1</span>{" "}
                </li>
              </ul>
            </div>
          </div>
        </aside>
        <section className="content">
          <Cover
            cover={Orquestas[0].cover}
            title={Orquestas[0].name}
            location={Orquestas[0].ubication}
          />
          <div className="form-container">
            <div
              className="pic"
              style={{ backgroundImage: `url(${Users[0].image})` }}
            ></div>
            <form className="post-form">
              <input
                className="post-input"
                type="text"
                placeholder="Nueva publicación..."
              />
            </form>
          </div>
          <div className="filter-container">
            <div className="divider"></div>
            <div className="post-filter">
              Ordenar por: <b>Mas recientes</b>
            </div>
          </div>

          <div className="posts">
            {Posts.map((post, index) => (
              <OrchestraPosts key={index} post={post} />
            ))}
          </div>
        </section>
        <aside className="aside-right">Derecha</aside>
      </StyledMain>
    </>
  );
}

export default OrchestraDetails;

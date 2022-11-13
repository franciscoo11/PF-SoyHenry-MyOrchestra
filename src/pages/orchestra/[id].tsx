import { useRouter } from "next/router";
import Cover from "../../frontend/components/Cover";
import MainNavBar from "../../frontend/components/MainNavBar";
import { Orquestas, Posts, Users } from "../../frontend/utils/fakeDB";
import styled from "styled-components";
import OrchestraPosts from "../../frontend/components/OrchestraPosts";
import {
  FiHome,
  FiInfo,
  FiUsers,
  FiEye,
  FiVideo,
  FiFile,
  FiCalendar,
  FiHeart,
} from "react-icons/fi";

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
        z-index: 20;
      }

      .orchestra-nav {
        margin-top: -55px;
        border: 1px solid lightgrey;
        padding: 80px 24px;
        border-radius: 10px 10px 0px 50%;
        position: relative;
        z-index: 10;

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          text-transform: uppercase;
          font-size: 0.8em;

          .nav-item {
            padding: 8px 0 8px 40px;
            border-bottom: 1px solid lightgrey;
            display: flex;
            align-items: baseline;
            gap: 6px;

            &:hover {
              color: ${({ theme }) => theme.colors.secondary};
              cursor: pointer;
            }

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
    display: flex;
    flex-direction: column;
    gap: 24px;

    .donate-container,
    .campaign-container {
      padding: 18px;
      border: 1px solid lightgrey;
      text-align: center;
      border-radius: 6px;

      .donate-icon-container {
        font-size: 4em;
        color: ${({ theme }) => theme.colors.secondary};
      }

      .campaign-header,
      .campaign-details {
        border-bottom: 1px solid lightgrey;
        text-align: initial;

        .campaign-subtitle,
        .campaign-desc,
        .campaign-goal-title,
        .campaign-goal-amount,
        .campaign-end-title,
        .campaign-end-date {
          margin: 0;
        }

        .campaign-end-title {
          margin-top: 12px;
        }

        .campaign-title {
          margin: 0;
          margin-bottom: 24px;
          text-align: center;
        }

        .campaign-subtitle,
        .campaign-goal-title,
        .campaign-end-title {
          font-size: 0.9em;
          font-weight: bold;
        }

        .campaign-desc {
          font-size: 0.9em;
        }

        .read-more {
          color: ${({ theme }) => theme.colors.secondary};
          font-size: 0.8em;
          text-align: right;
        }
      }

      .campaign-details {
        padding: 12px;
      }

      .campaign-footer {
        .campaig-footer-title {
          font-size: 0.8em;
          font-weight: bold;
        }
        .campaign-current-amount {
          font-size: 1.5em;
          font-weight: bold;
          margin: 12px 0;
        }
        .campaign-progress-bar {
          width: 100%;
          background-color: lightgrey;
          border-radius: 12px;
          margin-bottom: 24px;

          .campaign-current-progress-bar {
            width: 24%;
            height: 12px;
            background-color: ${({ theme }) => theme.colors.secondary};
            opacity: 50%;
            border-radius: 12px;
          }
        }
      }

      .donate-info {
        .info-title {
          font-weight: bold;
        }
        .info-content {
          font-size: 0.9em;
        }
      }

      .donate-icon-container {
        border-bottom: 1px solid lightgrey;
      }
    }
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
                <li className="nav-item">
                  <FiHome />
                  <div>Inicio</div>
                </li>
                <li className="nav-item">
                  <FiInfo />
                  <div>Acerca de</div>
                </li>
                <li className="nav-item">
                  <FiUsers />
                  <div>Integrantes</div>
                </li>
                <li className="nav-item">
                  <FiEye />
                  <div>Noticias</div>
                </li>
                <li className="nav-item">
                  <FiVideo />
                  <div>Multimedia</div>
                </li>
                <li className="nav-item">
                  <FiFile />
                  <div>Archivos</div>
                </li>
                <li className="nav-item">
                  <FiCalendar />
                  <div>Eventos</div>
                </li>
                <li className="nav-item">
                  <FiHeart />
                  <div>Campañas</div>
                </li>
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
        <aside className="aside-right">
          <div className="donate-container">
            <div className="donate-icon-container">
              <FiHeart />
            </div>
            <div className="donate-info">
              <p className="info-title">
                Entre todos podemos <br /> hacer la diferencia
              </p>
              <p className="info-content">
                Colaborá con esta y/u otras orquestas para que puedan seguir
                adelante con esta hermosa actividad.
              </p>
            </div>
            <div className="donate-btn-container">
              <button>Donar</button>
            </div>
          </div>
          <div className="campaign-container">
            <div className="campaign-header">
              <h3 className="campaign-title">Campaña Abierta</h3>
              <p className="campaign-subtitle">Campaña</p>
              <p className="campaign-desc">
                Viaje de intercambio a Temuco-Chile
              </p>
              <p className="read-more">leer más</p>
            </div>
            <div className="campaign-details">
              <p className="campaign-goal-title">Objetivo</p>
              <p className="campaign-goal-amount">$75.000</p>
              <p className="campaign-end-title">Finaliza:</p>
              <p className="campaign-end-date">02/02/2023</p>
            </div>
            <div className="campaign-footer">
              <p className="campaig-footer-title">Alcanzado hasta el momento</p>
              <p className="campaign-current-amount">$17.985</p>
              <div className="campaign-progress-bar">
                <div className="campaign-current-progress-bar"></div>
              </div>
              <button>Colaborar</button>
            </div>
          </div>
        </aside>
      </StyledMain>
    </>
  );
}

export default OrchestraDetails;

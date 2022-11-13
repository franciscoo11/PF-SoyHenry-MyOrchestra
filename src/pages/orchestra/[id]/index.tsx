import { useRouter } from "next/router";
import Cover from "../../../frontend/components/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import { Orquestas, Posts, Users } from "../../../frontend/utils/fakeDB";
import styled from "styled-components";
import OrchestraPosts from "../../../frontend/components/OrchestraPosts";
import { FiVideo, FiImage, FiFileText } from "react-icons/fi";
import Footer from "../../../frontend/components/Footer";
import AsideLeft from "../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";

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
    grid-row: 1;
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
    grid-row: 1;
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
        position: relative;

        .post-form-icons-container {
          position: absolute;
          top: 12px;
          right: 18px;
          color: gray;
          display: flex;
          gap: 6px;
        }
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
    grid-row: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .donate-container,
    .campaign-container {
      padding: 18px;
      border: 1px solid lightgrey;
      text-align: center;
      border-radius: 6px;

      .donate-btn,
      .campaign-btn {
        background-color: ${({ theme }) => theme.colors.secondary};
        width: 100%;
        padding: 12px;
        font-size: 1em;
        color: white;
        border: none;
        border-radius: 6px;

        :hover {
          filter: brightness(110%);
          cursor: pointer;
        }
      }

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
          <AsideLeft />
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
              style={{ backgroundImage: `url(${Users[1].image})` }}
            ></div>
            <form className="post-form">
              <input
                className="post-input"
                type="text"
                placeholder="Nueva publicación..."
              />
              <div className="post-form-icons-container">
                <FiFileText />
                <FiVideo />
                <FiImage />
              </div>
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
          <AsideRight />
        </aside>
      </StyledMain>
      <Footer />
    </>
  );
}

export default OrchestraDetails;

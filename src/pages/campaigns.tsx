import Head from "next/head";
import MainNavBar from "../frontend/components/MainNavBar";
import styled from "styled-components";
import Footer from "../frontend/components/Footer";
import CampaignHero from "../frontend/components/CampaignHero";
import OrchestraCampaignCard from "../frontend/components/OrchestraCampaignCard";
import { Campaigns, Posts, Users } from "../frontend/utils/fakeDB";
import OpenCampaign from "../frontend/components/OpenCampaign";
import { prisma } from "./../../lib/prisma";

const StyledMain = styled.main`
  margin: 24px auto;
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  gap: 24px;
  padding: 0 80px;

  section {
    grid-column: 1/13;
    display: flex;
    flex-direction: column;
    gap: 24px;

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

    .campaigns {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .pagination {
      display: flex;
      justify-content: right;

      .more-btn {
        padding: 12px 24px;
        font-size: 12px;
        border: 2px solid ${({ theme }) => theme.colors.secondary};
        border-radius: 12px;
        font-weight: bold;
        background-color: white;
        margin: 12px;
        color: ${({ theme }) => theme.colors.secondary};

        :hover {
          cursor: pointer;
          background-color: ${({ theme }) => theme.colors.secondary};
          color: white;
        }
      }
    }
  }

  aside {
    grid-column: 13/17;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .campaign-container {
      padding: 18px;
      border: 1px solid lightgrey;
      text-align: center;
      border-radius: 6px;
      position: sticky;
      top: 24px;

      .campaign-btn {
        background-color: ${({ theme }) => theme.colors.secondary};
        width: 100%;
        padding: 12px;
        font-size: 1em;
        color: white;
        border: none;
        border-radius: 6px;
        display: block;

        :hover {
          filter: brightness(110%);
          cursor: pointer;
        }
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
    }
  }
`;

const Campañas = ({ campaigns }: any) => {
  return (
    <>
      <Head>
        <title>
          Campañas benéficas para Orquestas Populares Latinoamericanas
        </title>
      </Head>
      <MainNavBar />
      <CampaignHero />
      <StyledMain>
        <section>
          <div className="filter-container">
            <div className="divider"></div>
            <div className="post-filter">
              Ordenar por: <b>Mas recientes</b>
            </div>
          </div>
          <div className="campaigns">
            {campaigns.map((campaign: any) => (
              <OrchestraCampaignCard
                key={campaign.id}
                title={campaign.title}
                end={campaign.end_date}
                description={campaign.description}
                goal={campaign.goal_amount}
                id={campaign.id}
                orchestraId={campaign.orchestraId}
                donations={campaign.donations}
              />
            ))}
          </div>
          <div className="pagination">
            <button className="more-btn">Mostrar más</button>
          </div>
        </section>
        <aside>
          <OpenCampaign />
        </aside>
      </StyledMain>
      <Footer />
    </>
  );
};

export default Campañas;

export const getServerSideProps = async () => {
  const campaigns = await prisma.campaigns.findMany({
    orderBy: { end_date: "asc" },
    include: {
      donations: true,
    },
  });

  return {
    props: {
      campaigns: JSON.parse(JSON.stringify(campaigns)),
    },
  };
};

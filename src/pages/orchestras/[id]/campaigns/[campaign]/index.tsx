import { useRouter } from "next/router";
import MainNavBar from "../../../../../frontend/components/MainNavBar";
import Footer from "../../../../../frontend/components/Footer";
import AsideLeft from "../../../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../../../lib/prisma";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { FiTarget, FiCalendar, FiSmile } from "react-icons/fi";
import DonationMercadoForm from "../../../../../frontend/components/DonationMercadoForm";
import DonationForm from "../../../../../frontend/components/DonationForm";

const StyledEventCard = styled.div`
  width: 100%;
  border: 1px solid lightgrey;
  border-radius: 12px;

  .campaign-header {
    padding: 12px 18px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 12px;

    .campaign-calendar-icon {
      font-size: 2.5em;
      color: ${({ theme }) => theme.colors.secondary};
      margin: 0;
      display: flex;
      align-items: center;
    }

    .campaign-header-content {
      p,
      h2 {
        margin: 0;
      }

      .campaign-title {
        color: ${({ theme }) => theme.colors.secondary};
        font-weight: normal;
        font-size: 1.2em;
      }

      .campaign-date {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 0.9em;
      }
    }
  }

  .campaign-image {
    height: 16em;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .campaign-details,
  .donation-forms {
    padding: 12px 24px;
    .campaign-description {
      color: gray;
    }
    .campaign-details-title,
    .donation-title {
      color: ${({ theme }) => theme.colors.secondary};
      font-weight: 500;
    }

    .banner-container {
      display: flex;
      align-items: center;

      img {
        margin-left: 12px;
      }
    }

    .detail {
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-content: center;
      gap: 10px;
      margin: 6px 0;

      p {
        margin: 0;
      }
      .detail-icon {
        color: ${({ theme }) => theme.colors.secondary};
        font-size: 1.4em;
        display: flex;
        align-items: center;
      }
      .detail-text {
        display: flex;
        align-items: center;
        font-size: 0.9em;
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

export async function getServerSideProps({ params }: any) {
  try {
    const campaign = await prisma.campaigns.findUnique({
      where: {
        id: params.campaign,
      },
      include: {
        orchestra: true,
        donations: true,
      },
    });

    return { props: { campaign: JSON.parse(JSON.stringify(campaign)), idOrchestra: params.id, params: params } };
  } catch (error) {
    console.log(error);
  }
}

function OrchestraCampaigns({ campaign, idOrchestra }: any) {
  const { id, logo } = campaign.orchestra;
  const { user } = useUser();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const { title, end_date, goal_amount, description, donations } = campaign;
  const [display, setDisplay] = useState("");
  const getSum = (donations: any) => {
    let sum = 0;
    for (let i = 0; i < donations.length; i++) {
      sum += donations[i].amount;
    }
    return sum;
  };

  const amountRaised = getSum(donations);

  useEffect(() => {
    setLoading(true);
    if (user) {
      axios
        .get(`/api/user/${user.email}`)
        .then((res: any) => setUserId(res.data.id))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <AsideLeft logo={logo} id={id} user={user} />
        </aside>
        <section className="content">
          <StyledEventCard>
            <div className="campaign-header">
              <div className="campaign-calendar-icon">
                <FaHeart />
              </div>
              <div className="campaign-header-content">
                <h2 className="campaign-title">{title}</h2>
                <p className="campaign-date">Finaliza: {end_date}</p>
              </div>
            </div>

            {/* <div
        className="campaign-image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div> */}
            <div className="campaign-details">
              <p className="campaign-description">{description}</p>
              <h3 className="campaign-details-title">Detalles</h3>
              <div className="detail">
                <div className="detail-icon">
                  <FiTarget />
                </div>
                <div className="detail-text">
                  <b>Objetivo:&nbsp;</b>${goal_amount.toLocaleString()}
                </div>
              </div>
              <div className="detail">
                <div className="detail-icon">
                  <FiCalendar />
                </div>
                <div className="detail-text">
                  <b>Finaliza:&nbsp;</b>
                  {end_date}
                </div>
              </div>
              <div className="detail">
                <div className="detail-icon">
                  <FiSmile />
                </div>
                <div className="detail-text">
                  <b>Alcanzado:&nbsp;</b> ${amountRaised.toLocaleString()}
                </div>
              </div>
            </div>
          </StyledEventCard>
          <StyledEventCard>
            <div className="donation-forms">
              <p className="donation-text">
                No hay contribución pequeña, cualquier cantidad que gustes
                aportar a esta campaña de recaudación de fondos es muy valiosa y
                contribuye al alcance de la meta.
              </p>
              <h3 className="donation-title">Elige tu forma de pago:</h3>
              <div className="banner-container">
                <input
                  type="radio"
                  name="pago"
                  id="mercado"
                  value="mercado"
                  onFocus={(event) => setDisplay(event.target.value)}
                />
                <label htmlFor="mercado">
                  <img
                    src="https://imgmp.mlstatic.com/org-img/banners/mx/medios/MLM_468X60_new.jpg"
                    title="Mercado Pago - Medios de pago"
                    alt="Mercado Pago - Medios de pago"
                    width="468"
                    height="60"
                  />
                </label>
              </div>

              <div className="banner-container">
                <input
                  type="radio"
                  name="pago"
                  id="paypal"
                  value="paypal"
                  onFocus={(event) => setDisplay(event.target.value)}
                />
                <label htmlFor="paypal">
                  <img
                    src="https://www.paypalobjects.com/webstatic/mktg/logo-center/logotipo_paypal_pagos_tarjetas.jpg"
                    alt="Marcas de aceptación"
                  />
                </label>
              </div>
            </div>
          </StyledEventCard>
          <StyledEventCard>
            {display !== "" ? (
              display === "mercado" ? (
                <DonationMercadoForm id={campaign.id} idOrchestra={idOrchestra} />
              ) : (
                <DonationForm id={campaign.id} idOrchestra={idOrchestra}/>
              )
            ) : null}
          </StyledEventCard>
        </section>
        <aside className="aside-right">
          <AsideRight />
        </aside>
      </StyledMain>
      <Footer />
    </>
  );
}

export default OrchestraCampaigns;

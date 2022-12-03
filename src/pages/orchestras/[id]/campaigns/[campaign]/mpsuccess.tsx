import axios from "axios";
import React from "react";
import { HOSTNAME } from "../../../../../pages/_app";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import styled from "styled-components";

const StyledDiv = styled.div`
  background-image: url("/bg_01.jpg");
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  color: white;

  div {
    text-align: center;
    button {
      background-color: white;
      border: none;
      padding: 12px;
      border-radius: 12px;
      font-weight: bold;

      :hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.secondary};
        color: white;
      }
    }
  }
`;

//  interface IPaymentDetail {
//    paymentDetail: {
//      status: string;
//      payerEmail: string;
//      mount: string;
//      date: string;
//      idCampaign: string;
//      status_detail: string;
//    };
//  }

const mpSuccess = ({ paymentDetail, idOrchestra, idCampaign }: any) => {
  const router = useRouter();
  const cookie = new Cookies();
  const user = cookie.get("UserloginData");

  if (!paymentDetail) {
    toast.error(
      "Lo sentimos pero su donación no fue exitosa, intente nuevamente",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );

    router.push(`/orchestras/${idOrchestra}/campaigns/${idCampaign}`);
  }

  const handleButtonRedirect = (e: any) => {
    axios
      .post("/api/donation", {
        campaignId: idCampaign,
        userId: user.id,
        amount: paymentDetail.mount,
        orchestraId: idOrchestra,
      })
      .then(() => {
        toast.success("Pago realizado", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push(`/orchestras/${idOrchestra}/campaigns`);
      })
      .catch(() => {
        toast.error("No se pudo verificar tu pago.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <StyledDiv>
      {paymentDetail.status_detail == "accredited" ? (
        <div>
          <img src="/mapa.png" alt="Mapa Orquestas" height="200px" />
          <br />
          <img
            src="/isologo.png"
            alt="Red de Orquestas Populares de Musica Latinoamericana"
            height="60px"
          />
          <h2>GRACIAS POR TU COLABORACIÓN!!</h2>
          <button onClick={(e) => handleButtonRedirect(e)}>CONTINUAR</button>
        </div>
      ) : null}
    </StyledDiv>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const { id, campaign, payment_id } = context.query;
    const { data: response } = await axios.get(
      `${HOSTNAME}/api/mercadopago?id=${payment_id}`,
      {
        headers: {
          "Accept-Encoding": "null",
        },
      }
    );

    return {
      props: {
        paymentDetail: response,
        idOrchestra: id,
        idCampaign: campaign,
      },
    };
  } catch (error) {
    return { redirect: { destination: "/" } };
  }
}

export default mpSuccess;

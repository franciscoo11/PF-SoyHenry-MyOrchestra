import axios from "axios";
import React from "react";
import { HOSTNAME } from "./_app";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

interface IPaymentDetail {
  paymentDetail: {
    status: string;
    payerEmail: string;
    mount: string;
    date: string;
    idCampaign: string;
    status_detail: string;
  };
}

const mpSuccess = ({ paymentDetail }: IPaymentDetail) => {
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

    router.push("/");
  }

  const handleButtonRedirect = async (e: any) => {
    e.preventDefault();

    toast.success("Lo estamos redirigiendo aguarde unos instantes...", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    await axios
      .post(`/api/donation`, {
        campaignId: "clanmc8wb001ni5zzsnvy42ee",
        userId: user.id,
        amount: paymentDetail.mount,
        date: paymentDetail.date,
        orchestraId: "clani4ut8000di5zzxfsv7l7r",
      })
      .catch(() => alert("No se pudo registrar tu donación"));
    console.log(paymentDetail);

    router.push("/");
  };

  return (
    <>
      {paymentDetail.status_detail == "accredited" ? (
        <div>
          <h2>
            GRACIAS POR TU COLABORACIÓN, EN UNOS INSTANTES SERÁS REDIRIGIDO...
          </h2>
          <button onClick={(e) => handleButtonRedirect(e)}>CONTINUAR</button>
        </div>
      ) : null}
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const { data: response } = await axios.get(
      `${HOSTNAME}/api/mercadopago?id=${context.query.payment_id}`
    );

    return {
      props: {
        paymentDetail: response,
      },
    };
  } catch (error) {
    return { redirect: { destination: "/" } };
  }
}

export default mpSuccess;

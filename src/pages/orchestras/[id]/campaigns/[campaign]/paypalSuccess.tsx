import axios from "axios";
import React from "react";
import { HOSTNAME } from "../../../../../pages/_app";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// interface IPaymentDetail {
//   paymentDetail: {
//     id: string;
//     status: string;
//     payerEmail: string;
//     name: string;
//     mount: string;
//     date: string;
//     idCampaign: string;
//   };
// }

const paypalSuccess = ({ paymentDetail, idOrchestra, idCampaign }: any) => {
  const router = useRouter();
  const cookie = new Cookies();
  const user = cookie.get("UserloginData");
  console.log(paymentDetail);

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
        campaignId: idCampaign,
        userId: user.id,
        amount: paymentDetail.mount,
        date: paymentDetail.date,
        orchestraId: idOrchestra,
      })
      .catch(() =>
        toast.error("Verifica los datos ingresados, y vuelve a intentar.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );

    router.push("/");
  };

  return (
    <>
      {paymentDetail.status == "COMPLETED" ? (
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
    const { id, campaign, payment_id } = context.query;
    const { data: response } = await axios.get(
      `${HOSTNAME}/api/paypal/${payment_id}`
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

export default paypalSuccess;

import axios from "axios";
import React from "react";
import { HOSTNAME } from "../../../../../pages/_app";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

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

export async function getServerSideProps(context: any) {
  try {
    
    const { data: response } = await axios.get(
      `${HOSTNAME}/api/paypal/${context.query.token}`
    );

    return {
      props: {
        paymentDetail: response,
        orchestraId: context.query.id,
        campaignId: context.query.campaign,
      },
    };
  } catch (error) {
    return { redirect: { destination: "/" } };
  }
}

const paypalSuccess = ({ paymentDetail, orchestraId, campaignId }: any) => {
  
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

  const handleButtonRedirect = (e: any) => {

       axios.post('/api/donation', {
        campaignId: campaignId,
        userId: user.id,
        amount: paymentDetail.mount,
        date: paymentDetail.date,
        orchestraId: orchestraId,
      }).then(() => {
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
        router.push('/')
      }).catch(() => {
        toast.error("Su pago no se concreto...", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }) 

    }

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

export default paypalSuccess;

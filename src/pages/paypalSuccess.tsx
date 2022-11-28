import axios from "axios";
import React from "react";
import { HOSTNAME } from "./_app";
import { useRouter } from "next/router";

interface IPaymentDetail {
  paymentDetail: {
    id: string
    status: string
    payerEmail: string
    name: string
    mount: string
    data: string
    idCampaign: string
  }
}

const paypalSuccess = ({paymentDetail}:IPaymentDetail) =>{
  const router = useRouter()

  if(!paymentDetail){
    alert('Lo sentimos pero su donación no fue exitosa, intente nuevamente')
    router.push('/')
  }

  const handleButtonRedirect = async (e:any) => {
    e.preventDefault()
    //LLAMAR ENDPOINT CREAR DONACION
    router.push('/')
  }

  return (
    <>
      {
        paymentDetail.status == 'COMPLETED' ? 
        <div>
          <h2>GRACIAS POR TU COLABORACIÓN, EN UNOS INSTANTES SERÁS REDIRIGIDO...</h2>
          <button onClick={(e) => handleButtonRedirect(e)}>CONTINUAR</button>
        </div>
        :
        null
      }
    </>
    );
}

export async function getServerSideProps(context:any) {
  const {data:response} = await axios.get(`${HOSTNAME}/api/paypal/${context.query.token}`)
  return {
    props:{
      paymentDetail: response
    }
  }
}

export default paypalSuccess

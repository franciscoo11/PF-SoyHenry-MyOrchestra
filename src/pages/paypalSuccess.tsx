import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function paypalSuccess() {
  const router = useRouter();
  const { token }: any = router.query;

  const [datapayment, setDataPayment] = useState({
    id: "",
    status: "",
    mount: "",
    payerEmail: "",
    name: "",
    date: "",
    idCampaign: "",
  });
  const [messi, setMessi] = useState(false);
  // useEffect(() => {
  //   const req = async () => {
  //     try {
  //       const response = await axios.get(`/api/paypal/${token}`);
  //       const datita = response.data;
  //       setDataPayment(datita);
  //     } catch (error) {
  //       return error;
  //     }
  //   };
  //   req();
  // }, []);
  const req: any = async () => {
    if (messi === false) {
      if (token !== undefined) {
        const request: any = await axios.get(`/api/paypal/${token}`);
        console.log(request);
        setMessi(true);
        return request;
      }
    }
  };

  const result = req();
  useEffect(() => {
    (async function anyNameFunction() {
      await result;
    })();
  }, []);

  return (
    <div>
      <h1>paypalSuccess</h1>
      {datapayment.status == "COMPLETED"
        ? "Gracias, pero no me mientas"
        : "El pago no fue concretado"}
    </div>
  );
}

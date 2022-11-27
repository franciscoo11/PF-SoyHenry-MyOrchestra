import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function paypalSuccess() {
  const { query } = useRouter();

  const [datapayment, setDataPayment] = useState({
    status: "",
    mount: "",
    payerEmail: "",
    name: "",
    date: "",
    idCampaign: "",
  });

  // const req: any = async () => {
  //   console.log(query.token);
  //   const request: any = await axios.get(`/api/paypal/${query.token}`);
  //   setDataPayment(request.data);
  //   return request;
  // };
  useEffect(() => {
    const axiosdata = async () => {
      const datita = await axios.get(`/api/paypal/${query.token}`);
      console.log(query.token);
      setDataPayment(datita.data);
    };
    axiosdata();
  }, []);
  return (
    <div>
      <h1>paypalSuccess</h1>
      {datapayment.status == "COMPLETED"
        ? "Gracias"
        : "El pago no fue concretado"}
    </div>
  );
}

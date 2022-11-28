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

  useEffect(() => {
    const req = async () => {
      try {
        const response = await axios.get(`/api/paypal/${token}`);
        const datita = response.data;
        setDataPayment(datita);
      } catch (error) {
        return error;
      }
    };
    req();
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

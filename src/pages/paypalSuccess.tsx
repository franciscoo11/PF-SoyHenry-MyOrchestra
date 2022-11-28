import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function paypalSuccess() {
  const router = useRouter();
  const { token }: any = router.query;

  const [datapayment, setDataPayment] = useState({
    status: "",
    mount: "",
    payerEmail: "",
    name: "",
    date: "",
    idCampaign: "",
  });
  console.log(datapayment);

  const [tokenId, setToken] = useState("");

  const getDataPayment = async (token: any) => {
    await axios
      .get(`/api/paypal/${token}`)
      .then((response) => setDataPayment(response.data));
  };

  useEffect(() => {
    console.log(tokenId);

    () => setToken(token);
    // axios.get(`/api/paypal/${token}`).then((res) => setDataPayment(res.data));
    getDataPayment(tokenId);
    // const funcionadaleee = async () => {
    //   await getDataPayment(token).then((res) => setDataPayment(res));
    // };
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

import axios from "axios";
import { useState } from "react";



export default function MercadoPago(){
   
    const [buttonText, setButtonText] = useState("")
    const [buttonText1, setButtonText1] = useState("")
    const [buttonText2, setButtonText2] = useState("")
    const [input, setInput] = useState([])
    const data = [{
      id:"1",
      title:"compra 1",
      price:250
    },{
      id:"2",
      title:"compra 2",
      price:500
    },{
      id:"3",
      title:"compra 3",
      price:1000
    }]

  const contactCreatePayment = () => {
    axios
      .post("/api/payment-mp", data[0])
      .then(result => setButtonText(result.data))
  }
  console.log(buttonText)
  const contactCreatePayment1 = () => {
    axios
      .post("/api/payment-mp", data[1])
      .then(result => setButtonText1(result.data))
  }
  const contactCreatePayment2 = () => {
    axios
      .post("/api/payment-mp", data[2])
      .then(result => setButtonText2(result.data))
  }
  
  const getPayments = async () => {
    let obj = {}
    await axios.get("/api/payment-mp")
    .then(result => {
      console.log(result.data)
      let length = result.data.body.results.length-1
      let status = result.data.body.results[length].status
      if(status === "approved"){
      let amount = result.data.body.results[length].transaction_amount
      obj = {orchestraId: "clascb10j0009sdsguidxscjp", userId:"5805d57c-0671-44e6-a85b-a34899b169ab", amount:amount}
      }else{
        return
      }
    })
    await axios.post("/api/donation", obj)
  }
  


    return (
        <div>
          <button onClick={getPayments}>x</button>
          <div>{JSON.stringify(input)}</div>
          <button type="button" onClick={contactCreatePayment}>pagar 250</button>
          <a href={buttonText}>Link de pago: {buttonText}</a>
          <button type="button" onClick={contactCreatePayment1}>pagar 500</button>
          <a href={buttonText1}>Link de pago: {buttonText1}</a>
          <button type="button" onClick={contactCreatePayment2}>pagar 1000</button>
          <a href={buttonText2}>Link de pago: {buttonText2}</a>
          
        </div>
      );
}

import axios from "axios"
import { useState } from "react"

export default function Index () {
    const [buttonText, setButtonText] = useState("")
  
    const contactCreatePayment = () => {
      axios
        .post("/api/payment", paymentDataRequest)
        .then(result => setButtonText(result.data))
    }
    return (
            <>
            <p>
              Nombre: nombre - Stock: stock - Precio:{"15.50"}
            </p>
            <button type="button" onClick={contactCreatePayment}>
              Call MercadoPago
            </button>
            <br />
            <p id="buttonText">{buttonText}</p>
            </>
    )
  }
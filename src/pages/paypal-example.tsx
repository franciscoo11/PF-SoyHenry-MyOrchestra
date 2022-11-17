import React from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import axios from 'axios'

export default function paypal() {
  return (
    <div style={{ position: 'absolute', left: '45%', top: '40%'}}>
        <PayPalScriptProvider options={{ "client-id": "AVus1GYct9ksHXnwOzBPJUhCYwK_5C9oHteJoWuxOr4ctX4dOPzB9D6d2cRZc2jOj6xzR8Tkt3G6z4kS" }}>
            <PayPalButtons createOrder={ async ()=> {
                try{
                    const resp = await axios({
                        url:"http://localhost:3000/api/paypal",
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json"
                        }
    
                    }); 
                    return resp.data.id
                } catch(error){
                    console.log(error)
                }
                
            }} onCancel={ (data) => console.log('compra cancelada')} 
            onApprove={(data,actions) => {
                console.log(data)
                actions?.order?.capture()
            }} style={{ layout: "vertical", color: "blue", shape: "pill", label: "pay" }} />
        </PayPalScriptProvider>
    </div>
  )
}

import nodemailer from "nodemailer";

const { EMAIL, EMAIL_SECRET } = process.env;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_SECRET,
  },
});

transporter.verify().then(() => {
  console.log("Configuration has working perfect!");
});

export const emailer = function (user:any, subject:any, title:any, body:any) {
  return {
    from: `"My Orchestras App" <${EMAIL}>`,
    to: user.email,
    subject: subject,
    html: ` 
    <div style="width: 100%; background-color: #e3e3e3;">
    <div style="padding: 20px 10px 20px 10px;">
        <div style="background-color: #222; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
        </div>
        
        <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
            <h1>${title}</h1>
            <p>
                ${body}
            </p>

            <p>Gracias por tu tiempo.</p>
            <p style="margin-bottom: 50px;"><i>Sinceramente:</i><br>Equipo de My Orchestras</p>

            
            <a style="width: 25%;
            color: rgb(255, 255, 255); 
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            margin: 4px 2px;
            background-color: #862866;
            text-align: center;
            padding: 12px 32px;
            font-size: 1em;
            color: white;
            border: none;
            border-radius: 6px;
            cursor:pointer;
            transition-duration: 0.6s;" href="${process.env.HOSTNAME}">My Orchestras</a>
        </div>
        
        
        <div style="background-color: #222; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
          
            <h3>Politicas de seguridad:</h3>
            <p>Pon tus datos en un lugar seguro.</p>
            <p>No compartas tu información personal con otras personas.</p>
            <p>Si tienes dudas sobre algun movimiento extraño en tu cuenta, haganos saber!</p>
          
            <h4>Soporte</h4>
            <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                Contactanos:<br>
                Mail: <a  href="mailto:myorchestraslatam@gmail.com">myorchestraslatam@gmail.com</a><br>
            </p>
            <p style="background-color: #1d1d1d; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                © 2022 My Orchestras, All rights reserved.
            </p>
        </div>

    </div>
    </div>
       `,
  };
};
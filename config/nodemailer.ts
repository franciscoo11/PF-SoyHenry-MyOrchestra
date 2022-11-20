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

export const emailerReg = function (user: any) {
  return {
    from: `"My Orchestras App" <${EMAIL}>`,
    to: user.email,
    subject: "Bienvenido a My Orchestras App",
    html: ` 
      <div style="background-color: #2b9423; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3px 10px; font-weight: bold; border-radius: 5px;">
      <ul>
      <h2 style="color: #fff;">Hola ${user.name}, My Orchestras te da una calida bienvenida, gracias por ser parte de nuestra familia! </h2>
      </ul>
      </div>
      <ul>
      
      <h3 style="color: #000000;">ESTOS SON LOS DATOS DE TU CUENTA:</h3>
      <h4 style="color: #000000;">- Nombre: ${user.name}</h4>
      <h4 style="color: #000000;">- Email: ${user.email}</h4>

      </ul>
      <ul><br><br>
      <h3 style="color: #000000;">Politicas de seguridad:</h3>
      <li style="color: #000000;">Pon tus datos en un lugar seguro.</li>
      <li style="color: #000000;">No compartas tu información personal con otras personas.</li>
      <li style="color: #000000;">Si tienes dudas sobre algun movimiento extraño en tu cuenta, haganos saber!</li>
      </ul> `,
  };
};

export const emailerUpdate = function (user: any) {
  return {
    from: `"My Orchestras App" <${EMAIL}>`,
    to: user.email,
    subject: "Actualización de su cuenta",
    html: ` 
      <div style="background-color: #2b9423; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3px 10px; font-weight: bold; border-radius: 5px;">
      <ul>
      <h2 style="color: #fff;">Hola ${user.name}, te informamos que algunos datos de tu cuenta han sidos actualizada! </h2>
      </ul>
      </div>

      <h3 style="color: #000000;">Si no fuiste tú, comunicate con nosotros!</h3>
     
      <ul><br><br>
      <h3 style="color: #000000;">Politicas de seguridad:</h3>
      <li style="color: #000000;">Pon tus datos en un lugar seguro.</li>
      <li style="color: #000000;">No compartas tu información personal con otras personas.</li>
      <li style="color: #000000;">Si tienes dudas sobre algun movimiento extraño en tu cuenta, haganos saber!</li>
      </ul> `,
  };
};

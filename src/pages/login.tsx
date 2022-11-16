import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import axios from "axios";
import Footer from "../frontend/components/Footer";
import { useRouter } from "next/router";
import MainNavBar from "../frontend/components/MainNavBar";

const StyledForm = styled.div`
  background-image: url("/bg_01.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0 -100px;

  .form {
    box-sizing: border-box;
    margin: 25px auto;
    width: 100%;
    max-width: 1440px;
    display: grid;
    grid-template-columns: repeat(16, minmax(0, 1fr));
    gap: 24px;
    padding: 0 80px;

    .fields-container {
      grid-column: 5/13;
      grid-row: 1;
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 24px;
      padding: 120px 0px;
      margin: 25px;

      .input {
        display: block;
        width: 100%;
        font-family: "Lato";
        font-size: 0.9em;
        padding: 10px 15px;
        border-radius: 12px;
        border: none;
      }
      label,
      .error {
        padding: 6px;
        display: block;
        color: white;
        font-size: 0.7em;
        text-align: center;
      }

      .error {
        margin: 0;
        text-align: unset;
        margin-bottom: -12px;
      }

      .name-field {
        grid-column: 1/7;
        grid-row: 1;
      }
      .email-field {
        grid-column: 1/7;
        grid-row: 2;
      }
      .password {
        grid-column: 1/7;
        grid-row: 3;
      }
      .avatar-field {
        grid-column: 1/4;
        grid-row: 4;
      }
      .cover-field {
        grid-column: 4/7;
        grid-row: 4;
      }

      .city-field {
        grid-column: 1/3;
        grid-row: 5;
      }

      .year_of_birth-field {
        grid-column: 3/5;
        grid-row: 5;
      }
      .rolId-field {
        grid-column: 5/7;
        grid-row: 5;
      }

      .btn-container {
        grid-column: 1/7;
        grid-row: 6;
        text-align: right;

        .submitted {
          font-family: "Lato";
          color: white;
          background-color: transparent;
          border: 1px solid white;
          font-size: 1.1em;
          padding: 12px 24px;
          border-radius: 12px;

          :hover {
            cursor: pointer;
            border-color: gray;
            color: gray;
          }
        }
      }
    }
  }
`;

interface Values {
  name: string;
  email: string;
  password: string;
  avatar: string;
  cover: string;
  year_of_birth: string;
  city: string;
}

export default function CreateUser() {
  const router = useRouter();

  const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  return (
    <>
      <MainNavBar />
      <StyledForm>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            avatar: "",
            cover: "",
            year_of_birth: "",
            city: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Requerido"),
            email: Yup.string()
              .email("Correo inválido")
              .required("Ningún correo ingresado"),
            password: Yup.string()
              .min(8)
              .matches(
                passwordRegex,
                `La contraseña debe tener al menos 8, un dígito, al menos una minúscula y al menos una mayúscula.
            NO puede tener otros símbolos.`
              )
              .required("Ninguna contraseña ingresada"),
            avatar: Yup.string().url("URL inválido"),
            cover: Yup.string().url("URL inválido"),
            year_of_birth: Yup.string()
              .max(4, "Tiene que ser un número de 4 dígitos")
              .required("Requerido"),
            city: Yup.string().required("Requerido"),
          })}
          onSubmit={(values, { setSubmitting }: FormikHelpers<Values>) => {
            axios
              .post("http://localhost:3000/api/user", values)
              .then(() => {
                alert("Usuario creado exitosamente");
                router.push("/");
                setSubmitting(false);
              })
              .catch(() => {
                alert("Verifica los datos ingresados, y vuelve a intentar.");
                window.location.reload();
              });
          }}
        >
          <Form className="form">
            <div className="fields-container">
              <div className="name-field">
                <Field
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  className="input"
                />
                <p className="error">
                  <ErrorMessage name="name" className="errorMessage" />
                </p>
              </div>
              <div className="email-field">
                <Field
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="input"
                />
                <p className="error">
                  <ErrorMessage name="email" className="errorMessage" />
                </p>
              </div>
              <div className="password">
                <Field
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  className="input"
                />
                <p className="error">
                  <ErrorMessage name="password" className="errorMessage" />
                </p>
              </div>
              <div className="avatar-field">
                <Field
                  name="avatar"
                  type="text"
                  placeholder="Avatar"
                  className="input"
                />
                <p className="error">
                  <ErrorMessage name="avatar" className="errorMessage" />
                </p>
              </div>
              <div className="cover-field">
                <Field
                  name="cover"
                  type="text"
                  placeholder="Imagen de portada"
                  className="input"
                />
                <p className="error">
                  <ErrorMessage name="cover" className="errorMessage" />
                </p>
              </div>
              <div className="year_of_birth-field">
                <Field
                  name="year_of_birth"
                  type="text"
                  placeholder="Año de nacimiento"
                  className="input"
                />
                <p className="error">
                  <ErrorMessage name="year_of_birth" className="errorMessage" />
                </p>
              </div>
              <div className="city-field">
                <Field
                  name="city"
                  type="text"
                  placeholder="Ciudad"
                  className="input"
                />
                <p className="error">
                  <ErrorMessage name="city" className="errorMessage" />
                </p>
              </div>
              <div className="rolId-field">
                <Field name="rolId" as="select" className="input">
                  <option disabled value="">
                    Tipo de Usuario
                  </option>
                  <option>ADMIN</option>
                  <option>USER</option>
                </Field>
                <p className="error">
                  <ErrorMessage name="rolId" className="errorMessage" />
                </p>
              </div>
              <div className="btn-container">
                <button type="submit" className="submitted">
                  Crear usuario
                </button>
              </div>
            </div>
          </Form>
        </Formik>
        <Footer />
      </StyledForm>
    </>
  );
}

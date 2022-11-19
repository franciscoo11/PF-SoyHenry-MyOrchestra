import { Formik, Form, Field, ErrorMessage, FormikHelpers, validateYupSchema } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import axios from "axios";
import Footer from "../frontend/components/Footer";
import { useRouter } from "next/router";
import MainNavBar from "../frontend/components/MainNavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@auth0/nextjs-auth0";

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
        grid-column: 1/4;
        grid-row: 3;
      }
      .cover-field {
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
        grid-column: 1/7;
        grid-row: 2;
      }

      .birthday-field {
        grid-column: 1/3;
        grid-row: 5;
      }

      .rolId-field {
        grid-column: 3/5;
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
  email:string;
  avatar: string;
  cover: string;
  birthday: string;
  city:string;
  state:string;
  country:string;
  rolId:string;
}

export default function CreateUser(props:any) {
  const router = useRouter();
  return (
    <>
      <MainNavBar />
      <StyledForm>
        <Formik
          initialValues={{
            name: "",
            avatar: "",
            cover: "",
            birthday: "",
            city: "",
            state:"",
            country:"",
            rolId:"",
            email:""
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Requerido"),
            email: Yup.string()
              .email("Correo inválido")
              .required("Ningún correo ingresado"),
            avatar: Yup.string().url("URL inválido"),
            cover: Yup.string().url("URL inválido"),
            birthday: Yup.date()
            .required('Please enter a date of birth')
            .max(new Date(), "You can't born in this year!"),
            city: Yup.string().required("Requerido"),
            rolId: Yup.string().required()
          })}
          onSubmit={(values, { setSubmitting }: FormikHelpers<Values>) => {
            axios
              .post("http://localhost:3000/api/user", values)
              .then(() => {
                toast.success("Usuario creado exitosamente", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                setSubmitting(false);
              })
              .catch(() => {
                toast.error(
                  "Verifica los datos ingresados, y vuelve a intentar.",
                  {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  }
                );
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
              <div className="email-field">
              <Field
                name="email"
                type="text"
                placeholder="example@correo.com"
                className="input"
              />
              <p className="error">
                <ErrorMessage
                  name="email"
                  className="errorMessage"
                />
              </p>
            </div>
              <div className="birthday-field">
              <Field name="birthday" type="date" className="input" />
              <label>Fecha de Nacimiento</label>
              <p className="error">
                <ErrorMessage name="birthday" className="errorMessage" />
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
              <Field
                name="rolId"
                as="select"
                placeholder="roles"
                className="input"
              >
                <option disabled value="">
                  Desempeño
                </option>
                {props.allRols &&
                  props.allRols.map((rol: any) => (
                    <option value={rol.id} key={rol.id}>
                      {rol.name}
                    </option>
                  ))}
              </Field>
              <p className="error">
                <ErrorMessage
                  name="rolId"
                  className="errorMessage"
                />
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
        <ToastContainer />
      </StyledForm>
    </>
  );
}


export const getServerSideProps = async () => {
  const apiRols = await axios.get("http://localhost:3000/api/rols");
  const allRols = await apiRols.data;

  return {
    props: {
      allRols,
    },
  };
};
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import axios from "axios";
import Footer from "../../../frontend/components/Footer";
import MainNavBar from "../../../frontend/components/MainNavBar";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";
import PasswordShowHide from "../../../frontend/components/PasswordShowHide";

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

      .password-field {
        grid-column: 1/7;
        grid-row: 1;
      }
      .password1-field {
        grid-column: 1/7;
        grid-row: 2;
      }
      .password2-field {
        grid-column: 1/7;
        grid-row: 3;
      }

      .btn-container {
        grid-column: 1/7;
        grid-row: 4;
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
  password: string;
  password1: string;
  password2: string;
}

function ChangePassword({ user }: any) {
  const router = useRouter();
  console.log(user);
  const { email } = user;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  return (
    <>
      <MainNavBar />
      <StyledForm>
        <Formik
          initialValues={{
            password: "",
            password1: "",
            password2: "",
          }}
          validationSchema={Yup.object({
            password: Yup.string()
              .min(8)
              .matches(
                passwordRegex,
                `La contraseña debe tener al menos 8 digitos, un caracter especial, al menos una minúscula, debe contener algun numero y al menos una mayúscula`
              )
              .required("Ninguna contraseña ingresada"),
            password1: Yup.string()
              .min(8)
              .matches(
                passwordRegex,
                `La contraseña debe tener al menos 8 digitos, un caracter especial, al menos una minúscula, debe contener algun numero y al menos una mayúscula`
              )
              .required("Ninguna contraseña ingresada"),
            password2: Yup.string()
              .required("Campo obligatorio")
              .oneOf([Yup.ref("password1"), null], "La contraseña no coincide"),
          })}
          onSubmit={async (
            values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            try {
              const userEmail = await axios
                .get(`/api/user?email=${email}`)
                .then((response) => response.data);
              const checkPassword = bcrypt.hashSync(
                values.password,
                userEmail.password
              );
              checkPassword
                ? await axios.put(`/api/user/${email}`, {
                    password: values.password2,
                  })
                : toast.error(
                    "Verifica los datos ingresados y vuelve a intentar.",
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

              toast.success("Contraseña actualizada correctamente", {
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
              router.push("/");
            } catch (error) {}
          }}
        >
          <Form className="form">
            <div className="fields-container">
              <div className="password-field">
                <label>Contraseña anterior</label>
                <Field
                  name="password"
                  type="password"
                  className="input"
                  component={PasswordShowHide}
                />

                <p className="error">
                  <ErrorMessage name="password" className="errorMessage" />
                </p>
              </div>
              <div className="password1-field">
                <label>Nueva Contraseña</label>
                <Field
                  name="password1"
                  type="password"
                  className="input"
                  component={PasswordShowHide}
                />

                <p className="error">
                  <ErrorMessage name="password1" className="errorMessage" />
                </p>
              </div>

              <div className="password2-field">
                <label>Confirme contraseña</label>
                <Field
                  name="password2"
                  type="password"
                  className="input"
                  component={PasswordShowHide}
                />

                <p className="error">
                  <ErrorMessage name="password2" className="errorMessage" />
                </p>
              </div>

              <div className="btn-container">
                <button type="submit" className="submitted">
                  Cambiar contraseña
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

export const getServerSideProps = async ({ params }: any) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: params.id,
      },
    });
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    return error;
  }
};

export default ChangePassword;

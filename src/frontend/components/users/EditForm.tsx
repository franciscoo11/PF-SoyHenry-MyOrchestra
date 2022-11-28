import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HOSTNAME } from "../../../pages/_app";

const StyledForm = styled.div`
  .form {
    box-sizing: border-box;
    width: 100%;

    .fields-container {
      grid-column: 5/13;
      grid-row: 1;
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 24px;
      padding: 0px 24px;

      .input {
        display: block;
        width: 100%;
        font-family: "Lato";
        font-size: 0.9em;
        padding: 10px 15px;
        border-radius: 12px;
        border: 1px solid lightgray;
        background-color: #f1f2f6;
        :focus {
          border: none;
          outline: 1px solid ${({ theme }) => theme.colors.secondary};
        }
      }
      label,
      .error {
        padding: 6px;
        display: block;
        font-size: 0.7em;
        text-align: left;
        color: ${({ theme }) => theme.colors.secondary};
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

      .city-field {
        grid-column: 3/5;
        grid-row: 4;
      }

      .birthday-field {
        grid-column: 5/7;
        grid-row: 4;
      }
      .rolId-field {
        grid-column: 3/5;
        grid-row: 5;
      }
      .orchestraId-field {
        grid-column: 5/7;
        grid-row: 5;
      }
      .btn-container {
        grid-column: 1/7;
        grid-row: 6;
        text-align: right;

        .submitted {
          font-family: "Lato";
          font-weight: 500;
          color: ${({ theme }) => theme.colors.secondary};
          background-color: transparent;
          font-size: 1.1em;
          padding: 12px 24px;
          border-radius: 12px;
          border: 1px solid ${({ theme }) => theme.colors.secondary};

          :hover {
            cursor: pointer;
            border: none;
            outline: 1px solid ${({ theme }) => theme.colors.secondary};
            background-color: ${({ theme }) => theme.colors.secondary};
            color: white;
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
  avatar?: string;
  cover?: string;
  birthday: string;
  city: string;
  rolId: string;
}

export default function EditUser({ allRols, allUsers, allOrchestras }: any) {
  console.log(allOrchestras);
  const { results, data } = allOrchestras;
  const { rolId, name, email, password, birthday, city } = allUsers;
  const router = useRouter();
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  return (
    <StyledForm>
      <Formik
        initialValues={{
          name: name,
          email: email,
          password: password,
          birthday: birthday,
          city: city,
          rolId: rolId,
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
              `La contraseña debe tener al menos 8 digitos, un caracter especial, al menos una minúscula, debe contener algun numero y al menos una mayúscula`
            )
            .required("Ninguna contraseña ingresada"),
          avatar: Yup.string().url("URL inválido"),
          cover: Yup.string().url("URL inválido"),
          birthday: Yup.date()
            .max(new Date(), "Fecha incorrecta, ingrese una fecha valida")
            .required("Requerido"),
          city: Yup.string().required("Requerido"),
        })}
        onSubmit={(values, { setSubmitting }: FormikHelpers<Values>) => {
          axios
            .post("/api/user", values)
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

            <div className="birthday-field">
              <Field name="birthday" type="date" className="input" />
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
                placeholder="ACTIVIDAD"
                className="input"
              >
                {allRols &&
                  allRols.map((rol: any) => (
                    <option value={rol.id} key={rol.id}>
                      {rol.name}
                    </option>
                  ))}
              </Field>
              <p className="error">
                <ErrorMessage name="rolId" className="errorMessage" />
              </p>
            </div>
            <div className="orchestraId-field">
              <Field as="select" placeholder="ORQUESTA" className="input">
                {data.map((orchestra: any) => (
                  <option value={orchestra.id} key={orchestra.id}>
                    {orchestra.name}
                  </option>
                ))}
              </Field>
              <p className="error">
                <ErrorMessage name="rolId" className="errorMessage" />
              </p>
            </div>
            <div className="btn-container">
              <button type="submit" className="submitted">
                Guardar Cambios
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <ToastContainer />
    </StyledForm>
  );
}

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      .pais-field {
        grid-column: 1/3;
        grid-row: 3;
      }
      .state-field {
        grid-column: 3/5;
        grid-row: 3;
      }
      .city-field {
        grid-column: 5/7;
        grid-row: 3;
      }
      .rolId-field {
        grid-column: 1/4;
        grid-row: 4;
      }
      .orchestraId-field {
        grid-column: 4/7;
        grid-row: 4;
      }
      .btn-container {
        grid-column: 1/7;
        grid-row: 5;
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
  avatar?: string;
  cover?: string;
  city: string;
  rolId: string;
  state: string;
  country: string;
  orchestraId: string;
}

export default function EditUser({ user, orchestras, userRoles }: any) {
  const router = useRouter();

  const {
    avatar,
    birthday,
    city,
    country,
    email,
    name,
    rolId,

    state,
  } = user;

  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  return (
    <StyledForm>
      <Formik
        initialValues={{
          name: name ? name : "",
          email: email ? email : "",
          country: country ? country : "",
          state: state ? state : "",
          city: city ? city : "",
          rolId: "",
          orchestraId: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Requerido"),
          email: Yup.string()
            .email("Correo inválido")
            .required("Ningún correo ingresado"),
          city: Yup.string().required("Requerido"),
          state: Yup.string().required("Requerido"),
          country: Yup.string().required("Requerido"),
        })}
        onSubmit={async (values, { setSubmitting }: FormikHelpers<Values>) => {
          try {
            let postData = {
              rolId: values.rolId,
              userId: user.id,
              orchestraId: values.orchestraId,
            };
            await axios.post(
              `/api/useronorchestra?orchestraId=${postData.orchestraId}`,
              postData
            );
            let postUser = {
              name: values.name,
              email: values.email,
              country: values.country,
              state: values.state,
              city: values.city,
              first_time: false,
            };
            await axios.put(`/api/user/${values.email}`, postUser);

            toast.success("Datos actualizados correctamente", {
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
            router.push(`/users/${values.email}`);
          } catch (error) {
            toast.error("Verifica los datos ingresados, y vuelve a intentar.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
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

            <div className="pais-field">
              <Field
                name="country"
                type="text"
                placeholder="País"
                className="input"
              />
            </div>
            <div className="state-field">
              <Field
                name="state"
                type="text"
                placeholder="Estado"
                className="input"
              />
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
                <option value="">Elige un rol</option>
                {userRoles.map((rol: any) => (
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
              <Field name="orchestraId" as="select" className="input">
                <option value="">Orquesta</option>
                {orchestras.map((orchestra: any) => (
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

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import MainNavBar from "../../frontend/components/MainNavBar";
import * as Yup from "yup";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import Footer from "../../frontend/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HOSTNAME } from "../_app";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

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

      .location-field {
        grid-column: 1/7;
        grid-row: 2;
      }

      .email-field {
        grid-column: 1/4;
        grid-row: 3;
      }
      .phone-field {
        grid-column: 4/7;
        grid-row: 3;
      }

      .date-field {
        grid-column: 1/3;
        grid-row: 4;
      }

      .orchesta-type-field {
        grid-column: 3/5;
        grid-row: 4;
      }
      .sponsor-field {
        grid-column: 5/7;
        grid-row: 4;
      }

      .description-field {
        grid-column: 1/7;
        grid-row: 5;
      }
      .btn-container {
        grid-column: 1/7;
        grid-row: 6;
        text-align: right;

        .submit {
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
  description: string;
  creation_date: string;
  sponsor: string;
  location: string;
  donation_account: string;
  phone: string;
  orchestra_TypeId: string;
}

interface Props {
  types_orchestras: {
    id: string;
    type: string;
  }[];
}

export default function CreateOrchestra(props: Props) {
  const router = useRouter();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  return (
    <StyledForm>
      <MainNavBar />
      <Formik
        initialValues={{
          name: "",
          description: "",
          creation_date: "",
          sponsor: "",
          location: "",
          donation_account: "",
          phone: "",
          orchestra_TypeId: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(60, "Debes ingresar 25 caracteres máximo")
            .required("Requerido"),
          description: Yup.string()
            .max(250, "No debes ingresar más de 250 caracteres")
            .required("Requerido"),
          donation_account: Yup.string()
            .email("Correo inválido")
            .required("Ningún correo ingresado"),
          location: Yup.string().required("Ninguna ubicación ingresada"),
          sponsor: Yup.string(),
          phone: Yup.string()
            .matches(phoneRegExp, "Numero de teléfono inválido")
            .required("Ningún número de teléfono ingresado"),
        })}
        onSubmit={(values, { setSubmitting }: FormikHelpers<Values>) => {
          axios
            .post("/api/orchestra", values)
            .then(() => {
              toast.success("Orquesta creada exitosamente", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              router.push("/");
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
                placeholder="Nombre de la Orquesta"
                className="input"
              />
              <p className="error">
                <ErrorMessage name="name" className="errorMessage" />
              </p>
            </div>
            <div className="location-field">
              <Field
                name="location"
                type="text"
                placeholder="Ubicación (Ciudad, Provincia, Ciudad)"
                className="input"
              />
              <p className="error">
                <ErrorMessage name="location" className="errorMessage" />
              </p>
            </div>
            <div className="email-field">
              <Field
                name="donation_account"
                type="text"
                placeholder="Email Institucional"
                className="input"
              />
              <p className="error">
                <ErrorMessage
                  name="donation_account"
                  className="errorMessage"
                />
              </p>
            </div>

            <div className="phone-field">
              <Field
                name="phone"
                type="text"
                placeholder="Teléfono / WhatsApp"
                className="input"
              />
              <p className="error">
                <ErrorMessage name="phone" className="errorMessage" />
              </p>
            </div>

            <div className="date-field">
              {/* NO supe como validar las fechas :( */}
              <Field name="creation_date" type="date" className="input" />
              <label>Fecha de creación de la Orquesta</label>
              <p className="error">
                <ErrorMessage name="creation_date" className="errorMessage" />
              </p>
            </div>

            <div className="orchesta-type-field">
              <Field
                name="orchestra_TypeId"
                as="select"
                placeholder="Tipo de Orquesta"
                className="input"
              >
                <option disabled value="">
                  Tipo de Orquesta
                </option>
                {props.types_orchestras &&
                  props.types_orchestras.map((type_orq: any) => (
                    <option value={type_orq.id} key={type_orq.id}>
                      {type_orq.type}
                    </option>
                  ))}
              </Field>
              <p className="error">
                <ErrorMessage
                  name="orchestra_TypeId"
                  className="errorMessage"
                />
              </p>
            </div>

            <div className="sponsor-field">
              <Field
                name="sponsor"
                type="text"
                placeholder="Patrocinador oficial"
                className="input"
              />
              <p className="error">
                <ErrorMessage name="sponsor" className="errorMessage" />
              </p>
            </div>

            <div className="description-field">
              <Field
                name="description"
                as="textarea"
                placeholder="Breve descripción / reseña sobre la orquesta"
                className="input"
                rows="5"
                cols="30"
              />
              <p className="error">
                <ErrorMessage name="description" className="errorMessage" />
              </p>
            </div>

            <div className="btn-container">
              <button type="submit" className="submit">
                Crear
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <Footer />
      <ToastContainer />
    </StyledForm>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    const res = await axios.get(`${HOSTNAME}/api/orchestras-types`);
    const types_orchestras = await res.data;

    return {
      props: {
        types_orchestras,
      },
    };
  },
});

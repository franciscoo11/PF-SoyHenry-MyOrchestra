import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import MainNavBar from "./MainNavBar";

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

      .title-field {
        grid-column: 1/7;
        grid-row: 1;
      }

      .description-field {
        grid-column: 1/7;
        grid-row: 2;
      }

      .start-date-field {
        grid-column: 1/3;
        grid-row: 3;
      }

      .end-date-field {
        grid-column: 3/5;
        grid-row: 3;
      }

      .goal_amount-field {
        grid-column: 5/7;
        grid-row: 3;
      }
      .orchestraId-field {
        grid-column: 1/7;
        grid-row: 4;
      }

      .btn-container {
        grid-column: 1/7;
        grid-row: 5;
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
  title: string;
  goal_amount: string;
  start_date: string;
  end_date: string;
  description: string;
  orchestraId: string;
}

interface Props {
  orchestra: {
    id: string;
  }[];
}

export default function CreateCampaign(props: Props) {
  const router = useRouter();

  return (
    <StyledForm>
      <MainNavBar />
      <Formik
        initialValues={{
          title: "",
          start_date: "",
          end_date: "",
          goal_amount: "",
          description: "",
          orchestraId: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(25, "Debes ingresar 25 caracteres máximo")
            .required("Requerido"),
          description: Yup.string()
            .max(250, "No debes ingresar más de 250 caracteres")
            .required("Requerido"),
          goal_amount: Yup.number().required("Ingrese un monto válido"),
          orchestraId: Yup.string().required("Selecciona una orquesta"),
          start_date: Yup.string().required("Selecciona una fecha de inicio"),
          end_date: Yup.string().required(
            "Selecciona una fecha de finalización"
          ),
        })}
        onSubmit={(values, { setSubmitting }: FormikHelpers<Values>) => {
          axios
            .post("/api/campaign", values)
            .then(() => {
              toast.success("Campaña creada exitosamente", {
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
            <div className="title-field">
              <Field
                name="title"
                type="text"
                placeholder="Nombre de la Campaña"
                className="input"
              />
              <p className="error">
                <ErrorMessage name="title" className="errorMessage" />
              </p>
            </div>

            <div className="description-field">
              <Field
                name="description"
                as="textarea"
                placeholder="Breve descripción / reseña sobre la campaña"
                className="input"
                rows="5"
                cols="30"
              />
              <p className="error">
                <ErrorMessage name="description" className="errorMessage" />
              </p>
            </div>

            <div className="start-field">
              <Field name="start_date" type="date" className="input" />
              <label>Fecha de inicio de la campaña</label>
              <p className="error">
                <ErrorMessage name="start_date" className="errorMessage" />
              </p>
            </div>
            <div className="end-field">
              <Field name="end_date" type="date" className="input" />
              <label>Fecha de finalización de la campaña</label>
              <p className="error">
                <ErrorMessage name="end_date" className="errorMessage" />
              </p>
            </div>

            <div className="orchestraId-field">
              <Field name="orchestraId" as="select" className="input">
                <option disabled value="">
                  Seleccione una orquesta
                </option>
                {props.orchestra &&
                  props.orchestra.map((orchestra: any) => (
                    <option value={orchestra.id} key={orchestra.id}>
                      {orchestra.name}
                    </option>
                  ))}
              </Field>
              <p className="error">
                <ErrorMessage name="orchestraId" className="errorMessage" />
              </p>
            </div>

            <div className="goal_amount-field">
              <Field
                name="goal_amount"
                type="number"
                placeholder="Meta económica"
                className="input"
              />
              <p className="error">
                <ErrorMessage name="goal_amount" className="errorMessage" />
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
      <ToastContainer />
      <Footer />
    </StyledForm>
  );
}

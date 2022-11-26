import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import MainNavBar from "./MainNavBar";
import Footer from "./Footer";
import { HOSTNAME } from "../../pages/_app";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import styled from "styled-components";

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

      .tre-container {
        grid-column: 1/3;
        grid-row: 1;
      }

      .qui-container {
        grid-column: 3/5;
        grid-row: 1;
      }
      .mil-container {
        grid-column: 5/7;
        grid-row: 1;
      }
      .field-container {
        grid-column: 3/5;
        grid-row: 2;
      }
      .button-container {
        grid-column: 3/5;
        grid-row: 3;
      }
    }
  }
`;

interface Values {
  campaign: string;
  campaignId: string;
  orchestraId: string;
  userId: string;
  amount: string;
}

//   interface Props {
//     types_orchestras: {
//       id: string;
//       type: string;
//     }[];
//   }

export default function DonationForm() {
  const router = useRouter();
  return (
    <>
      <MainNavBar />

      <StyledForm>
        <Formik
          initialValues={{
            campaign: "",
            campaignId: "",
            orchestraId: "clani4ut8000di5zzxfsv7l7r",
            userId: "79bf4619-5b57-4d7a-a929-88bbed90ef33",
            amount: "",
          }}
          validationSchema={Yup.object({
            amount: Yup.number().required("Elige un monto"),
          })}
          onSubmit={(values, { setSubmitting }: FormikHelpers<Values>) => {
            axios.post("/api/donation", values).then(() => {
              toast.success("Donacion realizada exitosamente", {
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
              console.log(values);
            });
          }}
        >
          <Form className="form">
            <div className="fields-container">
              <div className="tre-container">
                <label>
                  <Field
                    className="input"
                    type="checkbox"
                    name="amount"
                    value="300"
                  />
                  300
                </label>
              </div>
              <div className="qui-container">
                <label>
                  <Field
                    className="input"
                    type="checkbox"
                    name="amount"
                    value="500"
                  />
                  500
                </label>
              </div>
              <div className="mil-container">
                <label className="1000">
                  <Field
                    className="input"
                    type="checkbox"
                    name="amount"
                    value="1000"
                  />
                  1000
                </label>
              </div>

              <div className="field-container">
                <Field
                  type="text"
                  className="input"
                  name="amount"
                  placeholder="Especifique un monto"
                />
              </div>
              <div className="button-container">
                <button type="submit">Enviar</button>
              </div>
            </div>
          </Form>
        </Formik>
      </StyledForm>
      <Footer />
    </>
  );
}

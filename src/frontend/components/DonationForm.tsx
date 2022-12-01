import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import MainNavBar from "./MainNavBar";
import Footer from "./Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledForm = styled.div`
  width: 100%;

  .form {
    box-sizing: border-box;
    margin: 24px auto;
    width: 100%;

    .fields-container {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 24px;

      input[type="radio"] {
        display: none;
      }

      input[type="radio"] + .donation-amount {
        display: block;
        background-color: ${({ theme }) => theme.colors.secondary};
        color: white;
        font-size: 1.2em;
        border-radius: 12px;
      }

      input[type="radio"]:checked + .donation-amount {
        filter: brightness(135%);
      }

      input[type="radio"]:hover + .donation-amount {
        filter: brightness(135%);
      }

      .another_amount {
        display: block;
        width: 100%;
        font-size: 0.9em;
        padding: 0;
        font-weight: bold;
      }

      .donate-btn {
        background-color: ${({ theme }) => theme.colors.secondary};
        color: white;
        font-size: 1.2em;
        border-radius: 12px;
        padding: 12px 24px;
        border: none;
        :hover {
          cursor: pointer;
          filter: brightness(135%);
        }
      }

      .input {
        display: block;
        width: 100%;
        font-family: "Lato";
        font-weight: bold;
        font-size: 0.9em;
        padding: 10px 15px;
        border-radius: 12px;
        border: 1px solid lightgrey;
        background-color: #f1f2f6;

        :focus {
          border: none;
          outline: 1px solid ${({ theme }) => theme.colors.secondary};
        }
      }

      label,
      .error {
        padding: 6px;
        font-size: 0.7em;
        text-align: center;
      }

      .tre-container {
        grid-column: 2/3;
        grid-row: 1;
      }

      .qui-container {
        grid-column: 3/4;
        grid-row: 1;
      }
      .mil-container {
        grid-column: 4/5;
        grid-row: 1;
      }
      .field-container {
        grid-column: 3/4;
        grid-row: 2;
      }
      .button-container {
        grid-column: 3/4;
        grid-row: 3;
        text-align: center;
      }
    }
  }
`;

interface Values {
  idCampaign: string;

  value: string;
}

//   interface Props {
//     types_orchestras: {
//       id: string;
//       type: string;
//     }[];
//   }

export default function DonationForm({ id, idOrchestra }: any) {
  const router = useRouter();
  return (
    <>
      <StyledForm>
        <Formik
          initialValues={{
            idCampaign: id,
            value: "",
          }}
          // validationSchema={Yup.object({
          //   value: Yup.string().required("Elige un monto"),
          // })}
          onSubmit={async (
            values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            // axios.post("/api/donation", values).then(() => {

            //   setSubmitting(false);
            //   console.log(values);
            // });
            try {
              const pago = await axios.post(`/api/paypal`, { idCampaign: values.idCampaign, value: values.value, idOrchestra});
              router.push(pago.data.paymentLink);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Form className="form">
            <div className="fields-container">
              <div className="tre-container">
                <Field
                  className="monto"
                  type="radio"
                  name="value"
                  value="5"
                  id="5"
                />
                <label htmlFor="5" className="donation-amount">
                  $5 USD
                </label>
              </div>
              <div className="qui-container">
                <Field
                  className="monto"
                  type="radio"
                  name="value"
                  value="25"
                  id="25"
                />
                <label htmlFor="25" className="donation-amount">
                  $25 USD
                </label>
              </div>
              <div className="mil-container">
                <Field
                  className="monto"
                  type="radio"
                  name="value"
                  value="50"
                  id="50"
                />
                <label htmlFor="50" className="donation-amount">
                  $50 USD
                </label>
              </div>

              <div className="field-container">
                <label htmlFor="custom" className="another_amount">
                  Otra cantidad:
                </label>

                <Field
                  type="text"
                  className="input"
                  name="value"
                  id="custom"
                  placeholder="0"
                />
              </div>
              <div className="button-container">
                <button type="submit" className="donate-btn">
                  Donar
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </StyledForm>
    </>
  );
}

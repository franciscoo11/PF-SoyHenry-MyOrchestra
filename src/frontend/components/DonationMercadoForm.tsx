import { Formik, Form, Field, FormikHelpers } from "formik";
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
  price: string;
}

export default function DonationMercadoForm({ id, idOrchestra }: any) {
  const router = useRouter();
  return (
    <>
      <StyledForm>
        <Formik
          initialValues={{
            idCampaign: id,
            price: "",
          }}
          onSubmit={async (
            values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            try {
              const pago = await axios.post(`/api/mercadopago`, { idCampaign: values.idCampaign, price: values.price, idOrchestra: idOrchestra });
              console.log(pago.data);
              router.push(pago.data.paymentLink);

              setSubmitting(false);
            } catch (error) {
              return error;
            }
          }}
        >
          <Form className="form">
            <div className="fields-container">
              <div className="tre-container">
                <Field
                  className="monto"
                  type="radio"
                  name="price"
                  value="300"
                  id="300"
                />
                <label htmlFor="300" className="donation-amount">
                  $300
                </label>
              </div>
              <div className="qui-container">
                <Field
                  className="monto"
                  type="radio"
                  name="price"
                  value="500"
                  id="500"
                />
                <label htmlFor="500" className="donation-amount">
                  $500
                </label>
              </div>
              <div className="mil-container">
                <Field
                  className="monto"
                  type="radio"
                  name="price"
                  value="1000"
                  id="1000"
                />
                <label htmlFor="1000" className="donation-amount">
                  $1000
                </label>
              </div>

              <div className="field-container">
                <label htmlFor="custom" className="another_amount">
                  Otra cantidad:
                </label>
                <Field
                  type="text"
                  className="input"
                  name="price"
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

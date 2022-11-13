// import axios from "axios";
// import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MainNavBar from "../../frontend/components/MainNavBar";
import * as Yup from "yup";
import styled from "styled-components";

const StyledForm = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: auto;
    box-sizing: border-box;
    border: 1px solid lightgray;
    padding: 15px;
    justify-content: space-between;
    gap: 5px;
  }
  label {
    font-weight: bold;
    display: flex;
  }
  .input {
    padding: 0.65rem 0.5rem;
    font-size: 1rem;
    border: 2px solid gray;
    background-color: #f7f5f5;
    color: var(--gray-800);
    border-radius: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .errorMessage {
    color: red;
  }

  .submit {
    width: 100%;
    height: 35px;
    object-fit: cover;
    margin: auto;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default function CreateOrchestra() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  return (
    <StyledForm>
      <MainNavBar />
      <Formik
        initialValues={{
          logo: "",
          name: "",
          description: "",
          creation_date: "",
          sponsor: "",
          location: "",
          email: "",
          phone: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(25, "Must be 25 characters or less")
            .required("Required"),
          description: Yup.string()
            .max(250, "Must be 250 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          location: Yup.string().required("Required"),
          sponsor: Yup.string().required("Required"),
          phone: Yup.string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("Required"),
          logo: Yup.string().url("Invalid URL Logo").required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="form">
          <label>Nombre de la Orquesta</label>
          <Field
            name="name"
            type="text"
            placeholder="Nombre"
            className="input"
          />
          <ErrorMessage name="name" className="errorMessage" />

          <label>Descripción</label>
          <Field
            name="description"
            as="textarea"
            placeholder="Descripción de tu orquesta"
            className="input"
          />
          <ErrorMessage name="description" className="errorMessage" />

          <label>País</label>
          <Field
            name="location"
            type="text"
            placeholder="País"
            className="input"
          />
          <ErrorMessage name="location" className="errorMessage" />

          <label>Patrocinantes</label>
          <Field
            name="sponsor"
            type="text"
            placeholder="Escripe aquí tu patrocinante"
            className="input"
          />
          <ErrorMessage name="sponsor" className="errorMessage" />

          {/* NO supe como validar las fechas :( */}
          <label>Date</label>
          <Field name="date" type="date" className="input" />
          <ErrorMessage name="date" className="errorMessage" />

          <label>Email Institucional</label>
          <Field
            name="email"
            type="text"
            placeholder="Correo electrónico"
            className="input"
          />
          <ErrorMessage name="email" className="errorMessage" />

          <label>Número de Teléfono</label>
          <Field
            name="phone"
            type="text"
            placeholder="Contacto"
            className="input"
          />
          <ErrorMessage name="phone" className="errorMessage" />

          <label>Logo</label>
          <Field
            name="logo"
            type="text"
            placeholder="Fotico"
            className="input"
          />
          <ErrorMessage name="logo" className="errorMessage" />

          <button type="submit" className="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </StyledForm>
  );
}

// import axios from "axios";
// import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MainNavBar from "../../frontend/components/MainNavBar";
import * as Yup from "yup";

export default function CreateOrchestra() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  return (
    <div>
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
        <Form>
          <label>Nombre de la Orquesta</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <label>Descripción</label>
          <Field name="description" as="textarea" />
          <ErrorMessage name="description" />

          <label>País</label>
          <Field name="location" type="text" />
          <ErrorMessage name="location" />

          <label>Patrocinantes</label>
          <Field name="sponsor" type="text" />
          <ErrorMessage name="sponsor" />

          {/* NO supe como validar las fechas :( */}
          <label>Date</label>
          <Field name="date" type="date" />
          <ErrorMessage name="date" />

          <label>Email Institucional</label>
          <Field name="email" type="text" />
          <ErrorMessage name="email" />

          <label>Número de Teléfono</label>
          <Field name="phone" type="text" />
          <ErrorMessage name="phone" />

          <label>Logo</label>
          <Field name="logo" type="text" />
          <ErrorMessage name="logo" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

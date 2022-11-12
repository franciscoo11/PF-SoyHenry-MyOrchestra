import axios from "axios";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import MainNavBar from "../../frontend/components/MainNavBar";

export default function CreateOrchestra() {
  const handleSubmit = (values: any) => {
    alert(JSON.stringify(values));
  };

  const validate = (values: any) => {
    const errors = {};
    return errors;
  };

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
          donation_account: "",
          phone: "",
        }}
        onSubmit={handleSubmit}
        validate={validate}
      >
        <Form></Form>
      </Formik>
    </div>
  );
}

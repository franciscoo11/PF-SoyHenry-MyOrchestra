import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import styled from "styled-components";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const StyledForm = styled.div`
  .form {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(9, minmax(0, 1fr));
    gap: 24px;

    .error {
      font-family: "Lato";
      padding: 6px;
      display: block;
      color: #000000;
      font-size: 0.7em;
      text-align: center;
    }

    .error {
      margin: 0;
      text-align: unset;
      margin-bottom: -12px;
    }
    .form-header {
      grid-column: 1/7;
      grid-row: 1;

      .title {
        color: ${({ theme }) => theme.colors.secondary};
        margin: 0;
      }
    }

    .post-type-select {
      grid-column: 7/10;
      grid-row: 1;
    }

    .post-title {
      grid-column: 1/10;
      grid-row: 2;
    }

    .post-content {
      grid-column: 1/10;
      grid-row: 3;
    }

    .post-file {
      grid-column: 1/5;
      grid-row: 4;
    }

    .post-submit {
      grid-column: 7/10;
      grid-row: 4;
      text-align: right;

      .submit-btn {
        font-family: "Lato";
        font-weight: 500;
        color: ${({ theme }) => theme.colors.secondary};
        background-color: transparent;
        border: 1px solid ${({ theme }) => theme.colors.secondary};
        font-size: 1.1em;
        padding: 12px 24px;
        border-radius: 12px;

        :hover,
        :focus {
          cursor: pointer;
          border: 1px solid ${({ theme }) => theme.colors.secondary};
          outline: 1px solid ${({ theme }) => theme.colors.secondary};
          background-color: ${({ theme }) => theme.colors.secondary};
          color: white;
        }
      }
    }

    .input {
      display: block;
      width: 100%;
      font-family: "Lato";
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
    .select {
      width: 100%;
      font-family: "Lato";
      font-size: 0.9em;
      padding: 10px 15px;
      border-radius: 12px;
      border: 1px solid lightgrey;
    }
  }
`;

export default function CreatePosts({
  orchestraId,
  userCreator,
  postType,
  setPosting,
}: any) {
  if (userCreator) {
    return (
      <StyledForm>
        <Formik
          initialValues={{
            title: "",
            content: "",
            orchestraId,
            userCreator,
            type_PostId: postType,
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Requerido"),
            content: Yup.string().required("Requerido"),
          })}
          onSubmit={async (values: any, { setSubmitting, resetForm }) => {
            const file: any = values.file;
            const formData = new FormData();
            let url_file: string = "";

            try {
              setPosting(true);
              if (file) {
                formData.append("file", file);
                formData.append("upload_preset", "orchestras-uploads");
                const uploadImage = await toast.promise(
                  axios.post(
                    `https://api.cloudinary.com/v1_1/orchestrascloudinary/image/upload`,
                    formData
                  ),
                  {
                    pending: "Carga de imagen pendiente",
                    success: "Carga de imagen en proceso",
                    error: "Error de carga de imagen",
                  }
                );
                url_file = uploadImage.data.secure_url;
              }
              let postData = {
                title: values.title,
                content: values.content,
                orchestraId: values.orchestraId,
                userCreator: values.userCreator,
                type_PostId: values.type_PostId,
                url_file,
              };

              await axios.post("/api/post", postData);
              setSubmitting(false);
              toast.success("Tu publicación se envió.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              resetForm();
              setPosting(false);
            } catch (error) {
              toast.error("Verifica e intenta nuevamente.", {
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
          {({ setFieldValue }) => (
            <Form className="form">
              <div className="form-header">
                <h3 className="title">Crear publicación</h3>
              </div>

              {/* <div className="post-type-select">
              <Field name="type_PostId" as="select" className="select">
                {typePost &&
                  typePost.map((type_p: any) => (
                    <option value={type_p.id} key={type_p.id}>
                      {type_p.name}
                    </option>
                  ))}
              </Field>
            </div> */}
              <div className="post-title">
                <Field
                  name="title"
                  as="input"
                  placeholder="Titulo"
                  className="input"
                />
                <p className="error">
                  <ErrorMessage name="title" className="errorMessage" />
                </p>
              </div>

              <div className="post-content">
                <Field
                  name="content"
                  as="textarea"
                  placeholder="Texto de la publicación..."
                  className="input"
                  rows="5"
                  cols="30"
                />
                <p className="error">
                  <ErrorMessage name="content" className="errorMessage" />
                </p>
              </div>
              <div className="post-file">
                <Field
                  type="file"
                  name="image"
                  onChange={(event: any) => {
                    setFieldValue("file", event.target.files[0]);
                  }}
                />
              </div>
              <div className="post-submit">
                <button type="submit" className="submit-btn">
                  Publicar
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </StyledForm>
    );
  } else {
    return <p>Loading...</p>;
  }
}

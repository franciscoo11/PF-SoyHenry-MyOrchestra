import { Formik, Form, Field, FormikHelpers } from "formik";
import axios from "axios";
import styled from "styled-components";

const StyledForm = styled.div`
  .form {
    box-sizing: border-box;
    margin: 25px auto;
    width: 100%;
    max-width: 1440px;
    gap: 24px;
  }
  .container-top {
    margin-bottom: 10px;
  }
  .title {
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0;
  }
  .input {
    display: block;
    width: 100%;
    font-family: "Lato";
    font-size: 0.9em;
    padding: 10px 15px;
    border-radius: 12px;
    border: none;
  }
  .select {
    width: 100%;
    font-family: "Lato";
    font-size: 0.9em;
    padding: 10px 15px;
    border-radius: 12px;
    border: none;
  }
  .container {
  }
`;

export default function CreatePosts({ typePost }: any) {
  return (
    <StyledForm>
      <div className="container-top">
        <h3 className="title">Crear publicación</h3>
      </div>
      <Formik
        initialValues={{
          title: "Post Prueba",
          content: "",
          url_file: "",
          orchestraId: "clania754000hi5zzcjoz2dmy",
          userCreator: "143ad8c3-91dd-4149-b8ac-b623cacb1de7",
          type_post: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const file: any = values.url_file;
          const formData = new FormData();
          console.log(file);
          try {
            formData.append("file", file);
            formData.append("upload_preset", "orchestras-uploads");
            await axios.post(
              `https://api.cloudinary.com/v1_1/orchestrascloudinary/image/upload`,
              formData
            );
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form className="form">
            <div className="description-field">
              <Field
                name="content"
                as="textarea"
                placeholder="Escribe aquí tu publicación"
                className="input"
                rows="5"
                cols="30"
              />
            </div>
            <div className="container">
              <div className="select-field">
                <Field name="type_post" as="select" className="select">
                  <option disabled value="">
                    Tipo de Publicación
                  </option>
                  {typePost &&
                    typePost.map((type_p: any) => (
                      <option value={type_p.id} key={type_p.id}>
                        {type_p.name}
                      </option>
                    ))}
                </Field>
              </div>
              <div className="file-field">
                <Field
                  type="file"
                  name="url_file"
                  onChange={(event: any) => {
                    setFieldValue("file", event.target.files[0]);
                  }}
                />
              </div>
              <div className="button-field">
                <button type="submit" className="myBtn">
                  Publicar
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </StyledForm>
  );
}

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
          title: "kekeOscarcu",
          content: "",
          orchestraId: "clau9rlob0003vge02vmq17gb",
          userCreator: "b043f99a-7672-4474-a689-6e19c138c673",
          type_PostId: "",
        }}
        onSubmit={async (values: any, { setSubmitting }) => {
          const file: any = values.file;
          const formData = new FormData();

          try {
            formData.append("file", file);
            formData.append("upload_preset", "orchestras-uploads");
            const uploadImage: any = await axios.post(
              `https://api.cloudinary.com/v1_1/orchestrascloudinary/image/upload`,
              formData
            );
            let postData = {
              title: values.title,
              content: values.content,
              orchestraId: values.orchestraId,
              userCreator: values.userCreator,
              type_PostId: values.type_PostId,
              url_file: uploadImage.data.secure_url,
            };

            await axios.post("/api/post", postData);
            setSubmitting(false);
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
                <Field name="type_PostId" as="select" className="select">
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
                  name="image"
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

import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StyledDiv = styled.div`
  border-radius: 12px;
  border: 1px solid lightgray;
  overflow: hidden;

  .info {
    padding: 12px 24px;
  }

  .cover {
    width: 100%;
    height: 240px;
    background-size: cover;
    background-position: center;
  }

  .title {
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0;
  }

  p {
    margin: 0;
  }

  .location {
    font-weight: bold;
  }
`;

export default function Cover(props: any) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <StyledDiv>
      <Formik
        initialValues={{
          cover: "",
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
            console.log(uploadImage);

            let postData = {
              cover: uploadImage.data.secure_url,
            };
            await axios.put(`/api/orchestra/${id}`, postData);
            console.log(postData);
            toast.success("Cover actualizado correctamente", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            router.push(`/orchestras/${id}`);
            setSubmitting(false);
          } catch (error) {}
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <Field
              type="file"
              name="cover"
              onChange={(event: any) => {
                setFieldValue("file", event.target.files[0]);
              }}
            />
            <button type="submit">Actualizar</button>
          </Form>
        )}
      </Formik>
      <div
        className="cover"
        style={{ backgroundImage: `url(${props.cover})` }}
      ></div>
      <div className="info">
        <h2 className="title">{props.title}</h2>
        <p className="location">{props.location}</p>
        <p>27 integrantes</p>
      </div>
      <ToastContainer />
    </StyledDiv>
  );
}

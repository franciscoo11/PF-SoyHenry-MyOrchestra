import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UpdateCover = (props: any) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
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
      <ToastContainer />
    </>
  );
};

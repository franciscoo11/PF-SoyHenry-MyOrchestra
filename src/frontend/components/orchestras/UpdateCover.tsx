import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiCamera } from "react-icons/fi";

export const UpdateCover = ({ id }: any) => {
  const router = useRouter();

  async function handleImageLoad(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    try {
      formData.append("file", file);
      formData.append("upload_preset", "orchestras-uploads");

      const uploadImage: any = await toast.promise(
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

      let postData = {
        cover: uploadImage.data.secure_url,
      };
      await axios.put(`/api/orchestra/${id}`, postData);
      toast.success("Imagen de portada actualizada correctamente", {
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
    } catch (error) {}
  }

  return (
    <>
      {/* <Formik
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
      <ToastContainer /> */}
      <div className="container-input">
        <input
          className="inputfile inputfile-5"
          type="file"
          name="file"
          id="file"
          onChange={handleImageLoad}
        />
        <label htmlFor="file">
          <figure>
            <FiCamera className="iborrainputfile" />
          </figure>
        </label>
      </div>
      <ToastContainer />
    </>
  );
};

import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiCamera } from "react-icons/fi";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  /**********File Inputs**********/
  .container-input {
    position: absolute;
    bottom: 12px;
    right: 12px;
  }

  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .inputfile + label {
    font-size: 0.8em;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    padding: 10px;
  }

  .inputfile + label svg {
    vertical-align: middle;
  }

  /* style  */

  .inputfile-2 + label {
    color: white;
    border: 1px solid currentColor;
    border-radius: 10px;
  }

  .inputfile-2:focus + label,
  .inputfile-2.has-focus + label,
  .inputfile-2 + label:hover {
    color: lightgray;
  }
`;
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
    <StyledDiv>
      <div className="container-input">
        <input
          className="inputfile inputfile-2"
          type="file"
          name="cover"
          id="cover"
          onChange={handleImageLoad}
        />
        <label htmlFor="cover">
          <span className="iborrainputfile">Cambiar </span>
          <FiCamera className="iborrainputfile" />
        </label>
      </div>
      <ToastContainer />
    </StyledDiv>
  );
};

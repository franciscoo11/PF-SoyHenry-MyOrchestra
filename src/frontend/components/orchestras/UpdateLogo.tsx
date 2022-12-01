import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiCamera } from "react-icons/fi";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 32px;
  height: 32px;
  position: relative;

  /**********File Inputs**********/
  .container-input {
    text-align: center;
    margin: 0 auto;
    position: absolute;
    top: 80px;
    left: 70px;
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
    font-size: 1.25rem;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
  }

  .inputfile + label svg {
    vertical-align: middle;
    fill: currentColor;
  }

  /* style  */

  .inputfile-5 + label {
    color: gray;
  }

  .inputfile-5:focus + label,
  .inputfile-5.has-focus + label,
  .inputfile-5 + label:hover {
    color: white;
  }

  .inputfile-5 + label figure {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: lightgray;
    display: block;
    padding: 0px;
    margin: 0 auto;
    border: 2px solid white;
    box-shadow: 2px 2px 2px gray;
  }

  .inputfile-5:focus + label figure,
  .inputfile-5.has-focus + label figure,
  .inputfile-5 + label:hover figure {
    background-color: lightgray;
  }

  .inputfile-5 + label svg {
    width: 70%;
    height: 70%;
    margin: 0 auto;
    margin-top: 0.1em;
    fill: lightgray;
  }
`;

export const UpdateLogo = ({ id }: any) => {
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
          pending: "Carga de logo pendiente",
          success: "Carga de logo en proceso",
          error: "Error de carga de logo",
        }
      );

      let postData = {
        logo: uploadImage.data.secure_url,
      };
      await axios.put(`/api/orchestra/${id}`, postData);
      toast.success("Logo actualizado correctamente", {
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
      <StyledDiv>
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
      </StyledDiv>
    </>
  );
};

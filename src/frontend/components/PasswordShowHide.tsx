import React, { useState } from "react";
import styled from "styled-components";

const StyledPassword = styled.div`
  .input-container {
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    margin-bottom: 15px;
  }

  .icon {
    padding: 10px;
    background: #ffffff;
    color: white;
    min-width: 50px;
    text-align: center;
  }

  .icon:hover {
    cursor: pointer;
  }

  .input-field {
    width: 100%;
    padding: 10px;
    outline: none;
  }

  .input-field:focus {
    border: 2px solid dodgerblue;
  }

  .input-error {
    border: 2px solid red;
  }

  .icon-error {
    background: red;
  }
`;

const PasswordShowHide = ({ field, form }: any) => {
  const [showHidePassword, changeShowHidePassword] = useState(false);
  const hasError = form.touched[field.name] && form.errors[field.name];
  const showLogo =
    "https://res.cloudinary.com/dzup1ckpy/image/upload/v1669820913/ojo_y6x7ah.png";

  return (
    <StyledPassword>
      <div className="input-container">
        <img
          src={showLogo}
          onClick={() => changeShowHidePassword(!showHidePassword)}
          width="5%"
          className={hasError ? "icon-error icon" : "fa fa-key icon"}
        />

        <input
          type={showHidePassword ? "text" : "password"}
          {...field}
          className={hasError ? "input-error input-field" : "input-field"}
          placeholder="Contraseña"
        />
      </div>
    </StyledPassword>
  );
};

export default PasswordShowHide;

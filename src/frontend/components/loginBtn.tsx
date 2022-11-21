import { useRouter } from "next/router";
import styled from "styled-components";
import { useUser } from "@auth0/nextjs-auth0";

const StyledForm = styled.div`
  background-image: url("/bg_01.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .submitted {
    font-family: "Lato";
    color: white;
    background-color: transparent;
    border: 1px solid white;
    font-size: 1.1em;
    padding: 12px 24px;
    border-radius: 12px;

    :hover {
      cursor: pointer;
      background-color: white;
      color: black;
    }
  }
`;

export default function LoginBtn() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  return (
    <>
      <StyledForm>
        <div className="login-btn">
          <button
            type="submit"
            className="submitted"
            onClick={() => router.push("/api/auth/login")}
          >
            {" "}
            Iniciar Sesion{" "}
          </button>
        </div>
      </StyledForm>
    </>
  );
}

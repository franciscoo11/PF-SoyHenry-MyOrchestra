import styled from "styled-components";

const StyledDiv = styled.div`
  background-image: url("/bg_01.jpg");
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  color: white;

  div {
    text-align: center;
    button {
      background-color: white;
      border: none;
      padding: 12px;
      border-radius: 12px;
      font-weight: bold;

      :hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.secondary};
        color: white;
      }
    }
  }
`;

export default function Confirm() {
  return (
    <StyledDiv>
      <div>
        <img src="/mapa.png" alt="Mapa Orquestas" height="200px" />
        <br />
        <img
          src="/isologo.png"
          alt="Red de Orquestas Populares de Musica Latinoamericana"
          height="60px"
        />
        <h2>
          GRACIAS POR TU COLABORACIÓN, <br /> EN UNOS INSTANTES SERÁS
          REDIRIGIDO...
        </h2>
        <button>CONTINUAR</button>
      </div>
    </StyledDiv>
  );
}

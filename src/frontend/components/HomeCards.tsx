import styled from "styled-components";

const filesLogo =
  "https://res.cloudinary.com/dzup1ckpy/image/upload/v1668090828/abrir-documento_ifj9cl.png";
const commentLogo =
  "https://res.cloudinary.com/dzup1ckpy/image/upload/v1668090834/comentario_bfcnha.png";
const viewsLogo =
  "https://res.cloudinary.com/dzup1ckpy/image/upload/v1668090840/vista_j8t6ku.png";

const CardStyle = styled.div`
  box-sizing: border-box;
  width: 280px;
  border: 1px solid lightgray;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;

  .thumbnail {
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    max-width: 100%;
    max-height: 240px;
  }

  .logos {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
  }
  button {
    width: 100%;
    height: 35px;
    object-fit: cover;
    margin: auto;
    border-radius: 5px;
    cursor: pointer;
  }

  h3 {
    color: #9b9797;
  }

  .contador {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

function HomeCards(props: any) {
  return (
    <>
      <CardStyle>
        <div className="thumbnail">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="text">
          <h3>{props.subtitle}</h3>
          <h2>{props.title}</h2>
          <p>{props.content}</p>
        </div>
        <div className="container">
          <div className="logos">
            <div className="contador">
              <img src={viewsLogo} width="25%" />
              <div>1234 </div>
            </div>
            <div className="contador">
              <img src={commentLogo} width="25%" />
              <div>7 </div>
            </div>
            <div className="contador">
              <img src={filesLogo} width="25%" />
              <div>7</div>
            </div>
          </div>
          <div>
            <button>Ver más</button>
          </div>
        </div>
      </CardStyle>
    </>
  );
}

export default HomeCards;

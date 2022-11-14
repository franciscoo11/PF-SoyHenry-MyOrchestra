import Link from "next/link";
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
  gap: 6px;

  .card-header {
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-content {
    display: flex;
    flex-direction: column;

    p,
    h2,
    h3 {
      margin: 0;
    }
  }
  .card-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    max-width: 100%;
    max-height: 240px;
  }

  .card-counters-container {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
  }

  h3 {
    color: #9b9797;
  }

  .card-counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .card-btn-container {
    .card-btn {
      background-color: ${({ theme }) => theme.colors.secondary};
      text-align: center;
      display: block;
      width: 100%;
      padding: 12px;
      font-size: 1em;
      color: white;
      border: none;
      border-radius: 6px;

      :hover {
        filter: brightness(110%);
        cursor: pointer;
      }
    }
  }
`;

function HomeCards(props: any) {
  return (
    <>
      <CardStyle>
        <div className="card-header">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="card-content">
          <h3>{props.subtitle}</h3>
          <h2 className="card-title">{props.title}</h2>
          <p>{props.content}...</p>
        </div>
        <div className="card-footer">
          <div className="card-counters-container">
            <div className="card-counter">
              <img src={viewsLogo} width="25%" />
              <div>1234 </div>
            </div>
            <div className="card-counter">
              <img src={commentLogo} width="25%" />
              <div>7 </div>
            </div>
            <div className="card-counter">
              <img src={filesLogo} width="25%" />
              <div>7</div>
            </div>
          </div>
          <div className="card-btn-container">
            <Link
              href={`/orchestra/${encodeURIComponent(props.id)}`}
              legacyBehavior
            >
              <a className="card-btn">Ver más</a>
            </Link>
          </div>
        </div>
      </CardStyle>
    </>
  );
}

export default HomeCards;

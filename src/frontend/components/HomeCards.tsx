import styled from "styled-components";

const CardStyle = styled.div`
  box-sizing: border-box;
  width: 280px;
  border: 1px solid lightgray;
  padding: 15px;
  display: flex;
  flex-direction: column;
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
`;

function HomeCards(props: any) {
  return (
    <>
      <CardStyle>
        <div className="thumbnail">
          <img src={props.image} alt={props.title} />
        </div>
        <div>
          <h3>{props.subtitle}</h3>
          <h2>{props.title}</h2>
          <p>{props.content}</p>
        </div>
        <div>
          <div>
            Vistas:
            <span>1234</span>
          </div>
          <div>
            Comentarios:
            <span>7</span>
          </div>
          <div>
            Archivos:
            <span>7</span>
          </div>

        </div>
        <div>
          <button>Ver más</button>
        </div>
      </CardStyle>
    </>
  );
}

export default HomeCards;

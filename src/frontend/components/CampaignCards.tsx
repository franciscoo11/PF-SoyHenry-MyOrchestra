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

const CampaignCards = (props: any) => {
  return (
    <>
      <CardStyle>
        <div className="thumbnail">
          <img src={props.image} alt={props.title} />
        </div>
        <div>
          <h2>{props.title}</h2>
          <h3>{props.description}</h3>
          <p>Meta: {props.goal_amount} USD</p>
        </div>
        <div>
          Vistas:
          <span>13</span>
        </div>
        <div>
          Comentarios:
          <span>3</span>
        </div>
        <div>
          Archivos:
          <span>1</span>
        </div>
        <div>
          <button>Ver más</button>
        </div>
      </CardStyle>
    </>
  );
};

export default CampaignCards;

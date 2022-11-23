import styled from "styled-components";

const HeroContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 450px;
  background-image: url("/bg_01.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .container {
    height: 450px;
    margin: 0 auto;
    box-sizing: border-box;
    width: 100%;
    max-width: 1440px;
    display: grid;
    grid-template-columns: repeat(16, minmax(0, 1fr));
    gap: 24px;
    padding: 0 80px;

    .cover-art {
      grid-column: 3/9;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      img {
        max-height: 400px;
      }
    }

    .cover-info {
      grid-column: 9/16;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      color: white;

      h1,
      p {
        margin: 0;
      }

      .title {
        font-weight: lighter;
      }
    }
  }
`;

export default function CampaignHero() {
  return (
    <>
      <HeroContainer>
        <div className="container">
          <div className="cover-art">
            <img
              src="/mapa.png"
              alt="Imagen representando una mapa del continente americano formado por instrumentos musicales"
            />
          </div>
          <div className="cover-info">
            <h1 className="title">Campañas</h1>
            <p className="intro">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
              laudantium corporis animi perferendis, illum, adipisci ea,
              repellat reiciendis quibusdam voluptatem aspernatur rerum quis
              cupiditate iusto totam impedit numquam assumenda voluptate.
            </p>
          </div>
        </div>
      </HeroContainer>
    </>
  );
}

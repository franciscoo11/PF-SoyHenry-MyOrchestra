import styled from "styled-components";

const HeroContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 450px;
  background-image: url("/bg_01.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .content {
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
      grid-column: 3/15;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      img {
        max-height: 400px;
      }
    }
  }
`;

function HeroImage() {
  return (
    <>
      <HeroContainer>
        <div className="content">
          <div className="cover-art">
            <img
              src="/mapa.png"
              alt="Imagen representando una mapa del continente americano formado por instrumentos musicales"
            />
            <img
              src="/isologo.png"
              alt="Red de orquestas populares de música latinoamericana"
            />
          </div>
        </div>
      </HeroContainer>
    </>
  );
}

export default HeroImage;

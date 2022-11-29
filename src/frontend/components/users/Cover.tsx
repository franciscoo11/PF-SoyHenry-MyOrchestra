import styled from "styled-components";

const StyledDiv = styled.div`
  border-radius: 12px;
  border: 1px solid lightgray;
  overflow: hidden;

  .info {
    padding: 12px 24px;
  }

  .cover {
    width: 100%;
    height: 240px;
    background-size: cover;
    background-position: center;
    filter: grayscale();
  }

  .title {
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0;
  }

  p {
    margin: 0;
  }

  .location {
    font-weight: bold;
  }
`;

export default function UserCover({ cover, title, location, rolId }: any) {
  return (
    <StyledDiv>
      <div
        className="cover"
        style={{ backgroundImage: `url(${cover ? cover : "/user_cover.png"})` }}
      ></div>
      <div className="info">
        <h2 className="title">{title}</h2>
        <p className="location">{location}</p>
        <p>
          <b>Integrante de: </b> Nombre orquesta
        </p>
      </div>
    </StyledDiv>
  );
}

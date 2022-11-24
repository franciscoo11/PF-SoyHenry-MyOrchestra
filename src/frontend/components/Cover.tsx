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

export default function Cover(props: any) {
  return (
    <StyledDiv>
      <div
        className="cover"
        style={{ backgroundImage: `url(${props.cover})` }}
      ></div>
      <div className="info">
        <h2 className="title">{props.title}</h2>
        <p className="location">{props.location}</p>
        <p>27 integrantes</p>
      </div>
    </StyledDiv>
  );
}

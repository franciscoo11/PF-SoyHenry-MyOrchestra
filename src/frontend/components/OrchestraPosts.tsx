import styled from "styled-components";

const StyledDiv = styled.div`
  width: 100%;

  .media {
    width: 100%;
    height: 240px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export default function OrchestraPosts(props: any) {
  const { title, content, media } = props.post;

  return (
    <StyledDiv>
      <h2 className="post-title">{title}</h2>
      <div className="media" style={{ backgroundImage: `url(${media})` }}></div>
      <div className="content">
        <p>{content}</p>
      </div>
    </StyledDiv>
  );
}

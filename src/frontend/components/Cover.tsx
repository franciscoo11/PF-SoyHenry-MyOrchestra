import styled from "styled-components";

const CoverDiv = styled.div`
  width: 90%;
  max-width: 1300px;
  margin: 0 auto;
  height: 320px;
  background-size: cover;
  background-position: center;
  /* border-radius: 10px; */
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;

  .title {
    color: white;
    margin: 0 15px 10px 0;
  }

  .pic {
    width: 180px;
    height: 180px;
    background-color: gray;
    border: 4px solid white;
    border-radius: 100%;
    position: absolute;
    left: 50px;
    bottom: -80px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0px 5px 5px gray;
  }
`;

export default function Cover(props: any) {
  return (
    <>
      <CoverDiv style={{ backgroundImage: `url(${props.cover})` }}>
        <h1 className="title">{props.title}</h1>
        <div
          className="pic"
          style={{ backgroundImage: `url(${props.pic})` }}
        ></div>
      </CoverDiv>
    </>
  );
}

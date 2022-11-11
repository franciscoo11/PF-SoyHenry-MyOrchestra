import styled from "styled-components";
import { Orquestas, Users } from "../utils/fakeDB";

const StyledDiv = styled.div`
  width: 100%;
  border: 1px solid lightgrey;
  border-radius: 12px;
  overflow: hidden;

  .media {
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -100;
  }

  .content {
    width: 94%;
    margin: 0 3%;
    margin-top: -50px;
    background-color: white;
    padding: 18px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    h2 {
      font-size: 1.2em;
    }

    p {
      font-size: 1em;
    }

    h4,
    p {
      margin: 0;
    }

    .post-user {
      display: flex;
      align-items: center;
      gap: 12px;

      .pic {
        border: 1px solid lightgrey;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background-size: cover;
        background-position: center;
      }
      .post-user-info {
        width: 100%;
        p {
          font-size: 0.9em;

          span {
            float: right;
          }
        }
      }
    }
    .read-more {
      color: ${({ theme }) => theme.colors.secondary};
      font-size: 0.8em;
      text-align: right;
    }
    .post-reactions {
      font-size: 0.8em;
      border-top: 1px solid lightgrey;
      border-bottom: 1px solid lightgrey;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 12px;

      button {
        background-color: transparent;
        border: 1px solid lightgrey;
        font-size: 0.9em;
        font-weight: bold;
        padding: 6px 12px;
        border-radius: 6px;
      }
    }
  }
`;

export default function OrchestraPosts(props: any) {
  const { title, content, media } = props.post;

  return (
    <StyledDiv>
      <div className="media" style={{ backgroundImage: `url(${media})` }}></div>
      <div className="content">
        <h4 className="post-title">{title}</h4>
        <div className="post-user">
          <div
            className="pic"
            style={{ backgroundImage: `url(${Orquestas[0].logo})` }}
          ></div>
          <div className="post-user-info">
            <h4>{Orquestas[0].name}</h4>
            <p className="post-user-name">
              Publicado por: <b>{Users[0].name}</b> <span>hace 32 mins</span>
            </p>
          </div>
        </div>
        <p>{content}</p>
        <div className="read-more">leer más</div>
        <div className="post-reactions">
          <div>
            <p>7 reacciones / 2 comentarios </p>
          </div>
          <div>
            <button>Reaccionar</button>{" "}
          </div>
        </div>
      </div>
    </StyledDiv>
  );
}

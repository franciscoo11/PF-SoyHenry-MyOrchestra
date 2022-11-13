import styled from "styled-components";
import { Orquestas, Users, Comments } from "../utils/fakeDB";
import { FiThumbsUp } from "react-icons/fi";

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

      .post-reaction-btn {
        background-color: transparent;
        border: 1px solid lightgrey;
        font-size: 1.2em;
        font-weight: bold;
        padding: 8px 16px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 6px;

        span {
          font-size: 0.8em;
        }

        &:hover {
          background-color: #f1f2f6;
          cursor: pointer;
        }
      }
    }

    .comment-form-container {
      .comment-form {
        width: 100%;
      }

      .comment-input {
        background-color: #f1f2f6;
        border: none;
        font-size: 1em;
        width: 100%;
        padding: 12px;
        border-radius: 24px;
      }
    }

    .users-comments-container {
      display: flex;
      gap: 12px;
      justify-content: space-between;

      .user-comment {
        width: 100%;
        background-color: #f1f2f6;
        padding: 12px;
        position: relative;
        border-radius: 6px;

        ::after {
          content: "";
          display: block;
          position: absolute;
          top: 12px;
          margin-left: -24px;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right: 12px solid #f1f2f6;
        }
      }

      .user-pic {
        border: 1px solid lightgrey;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background-size: cover;
        background-position: center;
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
            <button className="post-reaction-btn">
              <span>Reaccionar</span>
              <FiThumbsUp />
            </button>
          </div>
        </div>
        <div className="comment-form-container">
          <form className="comment-form">
            <input
              className="comment-input"
              type="text"
              placeholder="Agregar un comentario..."
            />
          </form>
        </div>
        <div className="users-comments-container">
          <div
            className="user-pic"
            style={{ backgroundImage: `url(${Users[0].image})` }}
          ></div>
          <div className="user-comment">
            <p>{Comments[0].content}</p>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
}

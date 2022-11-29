import styled from "styled-components";
import { Orquestas, Users, Comments } from "../utils/fakeDB";
import { FiThumbsUp } from "react-icons/fi";
import { Formik, Form, Field, FormikHelpers } from "formik";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import UserComments from "./orchestras/UserComments";

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
    margin-bottom: -50px;
  }

  .content {
    width: 94%;
    margin: 0 3%;
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
        display: flex;
        align-items: baseline;
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

    .reaction-img {
      width: 20px;
      height: 20px;
      gap: 5px;
    }
  }
`;

export default function OrchestraPosts({
  post,
  orchestra,
  userId,
  setCommentPosted,
  user,
}: any) {
  const { id, title, content, url_file, comments, userCreator, user_reaction } =
    post;
  const { logo, name } = orchestra;
  const [username, setUsername] = useState("");

  const cookie = new Cookies();
  const [reactions, setReactions] = useState([
    { reaction: "", id: "" },
    { reaction: "", id: "" },
    { reaction: "", id: "" },
    { reaction: "", id: "" },
    { reaction: "", id: "" },
  ]);
  const [contReaction, setContReaction] = useState(user_reaction.length);
  const [userReactions, setUserReactions] = useState([
    { postId: "", userId: "", reactionId: "" },
  ]);
  const [dataUser, setDataUser] = useState({ id: "" });

  async function getReactions() {
    await axios.get("/api/reaction").then((response) => {
      setReactions(response.data);
    });
  }

  const handlePostReaction = async (
    post_id: any,
    user_id: any,
    reaction_id: any
  ) => {
    await axios.post(`/api/post-reaction?id=${post_id}`, {
      userId: user_id,
      reactionId: reaction_id,
    });
    setContReaction(contReaction + 1);
  };

  const handleRemoveReaction = async (user_id: any, post_id: any, id: any) => {
    if (!user_id) return [];
    await axios.delete(`/api/post-reaction?id=${post_id}`, {
      data: { userId: user_id, reactionId: id },
    });
    setContReaction(contReaction - 1);
  };

  const findReaction = async () => {
    await axios
      .get(`/api/post-reaction?userId=${dataUser.id}`)
      .then((response) => setUserReactions(response.data));
  };

  const findReacionMap = (post_Id: any, user_id: any) => {
    if (!user_id) return [];
    const casiReturn = userReactions.find((a) => {
      return a.postId == post_Id && a.userId == user_id;
    });

    return casiReturn?.reactionId;
  };
  useEffect(() => {
    setDataUser(cookie.get("UserloginData"));
    getReactions();
    findReaction();
    axios
      .get(`/api/user?userId=${userCreator}`)
      .then((res) => setUsername(res.data.name));
  }, [contReaction]);

  return (
    <StyledDiv>
      {url_file ? (
        <div
          className="media"
          style={{ backgroundImage: `url(${url_file})` }}
        ></div>
      ) : null}
      <div className="content">
        <h4 className="post-title">{title}</h4>
        <div className="post-user">
          <div
            className="pic"
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
          <div className="post-user-info">
            <h4>{name}</h4>
            <p className="post-user-name">
              Publicado por: <b>{username ? username : null}</b>
              {/* <span>hace 32 mins</span> */}
            </p>
          </div>
        </div>
        <p>{content}</p>
        {/* <div className="read-more">leer más</div> */}
        <div className="post-reactions">
          <div>
            <p>
              {contReaction} reacciones / {comments.length} comentarios{" "}
            </p>
          </div>
          <div>
            <div>
              {findReacionMap(id, dataUser.id) == reactions[0].id ? (
                <button
                  onClick={() =>
                    handleRemoveReaction(dataUser.id, id, reactions[0].id)
                  }
                >
                  <img
                    className="reaction-img"
                    src={reactions[0].reaction}
                    alt=""
                  />
                </button>
              ) : findReacionMap(id, dataUser.id) == reactions[1].id ? (
                <button
                  onClick={() =>
                    handleRemoveReaction(dataUser.id, id, reactions[1].id)
                  }
                >
                  <img
                    className="reaction-img"
                    src={reactions[1].reaction}
                    alt=""
                  />
                </button>
              ) : findReacionMap(id, dataUser.id) == reactions[2].id ? (
                <button
                  onClick={() =>
                    handleRemoveReaction(dataUser.id, id, reactions[2].id)
                  }
                >
                  <img
                    className="reaction-img"
                    src={reactions[2].reaction}
                    alt=""
                  />
                </button>
              ) : findReacionMap(id, dataUser.id) == reactions[3].id ? (
                <button
                  onClick={() =>
                    handleRemoveReaction(dataUser.id, id, reactions[3].id)
                  }
                >
                  <img
                    className="reaction-img"
                    src={reactions[3].reaction}
                    alt=""
                  />
                </button>
              ) : findReacionMap(id, dataUser.id) == reactions[4].id ? (
                <button
                  onClick={() =>
                    handleRemoveReaction(dataUser.id, id, reactions[4].id)
                  }
                >
                  <img
                    className="reaction-img"
                    src={reactions[4].reaction}
                    alt=""
                  />
                </button>
              ) : (
                <div>
                  {reactions.map((data) => (
                    <button
                      className="reaction-button"
                      onClick={() =>
                        handlePostReaction(id, dataUser.id, data.id)
                      }
                    >
                      <img
                        className="reaction-img"
                        src={data.reaction}
                        alt=""
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {user ? (
          <div className="comment-form-container">
            <Formik
              initialValues={{
                content: "",
                userId,
                postId: id,
              }}
              onSubmit={(values, { setSubmitting }) => {
                setCommentPosted(false);
                axios
                  .post("/api/comment", values)
                  .then(() => setCommentPosted(true));
                setSubmitting(false);
              }}
            >
              <Form className="comment-form">
                <Field
                  name="content"
                  type="text"
                  className="comment-input"
                  placeholder="Agregar un comentario..."
                />
                {/* <button type="submit" className="submit">
                Comentar
              </button> */}
              </Form>
            </Formik>
          </div>
        ) : null}
        {comments.map((comment: any) => (
          <UserComments key={comment.id} comment={comment} />
        ))}
      </div>
    </StyledDiv>
  );
}

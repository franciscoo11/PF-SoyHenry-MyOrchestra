import styled from "styled-components";
import { Orquestas, Users, Comments } from "../utils/fakeDB";
import { FiThumbsUp } from "react-icons/fi";
import { Formik, Form, Field, FormikHelpers } from "formik";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import UserComments from "./orchestras/UserComments";
import Link from "next/link";

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
      margin: 0;
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
    .link {
      color: ${({ theme }) => theme.colors.secondary};
    }

    .read-more {
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

    .reaction-img-choose {
      width: 20px;
      height: 20px;
      gap: 5px;
      transition: 0.3s;
    }
    .reaction-img-nochoose {
      width: 10px;
      height: 10px;
      gap: 5px;
      transition: 0.2s;
    }
  }
`;

export default function NewsHomeCard({ post }: any) {
  const { title, content, user, Orchestra } = post;
  return (
    <StyledDiv>
      <div className="content">
        <Link
          className="link"
          href={`/orchestras/${encodeURIComponent(Orchestra.id)}/news`}
        >
          <h2 className="post-title">{title}</h2>
        </Link>
        <div className="post-user">
          <div
            className="pic"
            style={{ backgroundImage: `url(${Orchestra.logo})` }}
          ></div>
          <div className="post-user-info">
            <h4>{Orchestra.name}</h4>
            <p className="post-user-name">
              Publicado por: <b>{user.name ? user.name : null}</b>
            </p>
          </div>
        </div>
        <p>{content}</p>
        <Link
          className="link read-more"
          href={`/orchestras/${encodeURIComponent(Orchestra.id)}/news`}
        >
          Leer más...
        </Link>
      </div>
    </StyledDiv>
  );
}

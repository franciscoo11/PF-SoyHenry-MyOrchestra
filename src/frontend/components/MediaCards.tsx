import { Users, Orquestas } from "../utils/fakeDB";
import styled from "styled-components";
import { FiMail } from "react-icons/fi";

const StyledMemberCard = styled.div`
  box-sizing: border-box;
  border: 1px solid black;
  width: 100%;
  position: relative;
  border-radius: 12px;
  border: 1px solid lightgrey;
  overflow: hidden;

  .media-pic {
    height: 8em;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .orchestra-logo {
    width: 3em;
    height: 3em;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 100%;
    box-shadow: 0px 2px 4px lightgray;
    border: 1px solid lightgray;
    position: absolute;
    right: 0.8em;
    bottom: 4.5em;
    background-color: white;
  }

  .content {
    padding: 18px 12px;
    p {
      margin: 0;
    }

    .media-label {
      text-transform: uppercase;
      color: gray;
      font-weight: bold;
      font-size: 0.8em;
    }

    .media-title {
      font-weight: bold;
      font-size: 1.1em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .media-btn {
      margin: 24px 0 0;
      .readmore-btn {
        width: 100%;
        padding: 12px 18px;
        font-size: 1em;
        color: ${({ theme }) => theme.colors.secondary};
        background-color: white;
        border: 1px solid ${({ theme }) => theme.colors.secondary};
        border-radius: 6px;

        :hover {
          background-color: ${({ theme }) => theme.colors.secondary};
          color: white;
          cursor: pointer;
        }
      }
    }
  }
`;

interface MediaCardModel {
  pic: string;
  title: string;
}

export default function MediaCard({ pic, title }: MediaCardModel) {
  return (
    <StyledMemberCard>
      <div
        className="media-pic"
        style={{ backgroundImage: `url(${pic})` }}
      ></div>
      <div className="content">
        <p className="media-label">Multimedia</p>
        <p className="media-title">{title}</p>
        <div className="media-btn">
          <button className="readmore-btn">Ver más</button>
        </div>
      </div>
    </StyledMemberCard>
  );
}

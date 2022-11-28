import styled from "styled-components";
import { FiMail } from "react-icons/fi";
import { Developers } from "../utils/fakeDB";
import MainNavBar from "./MainNavBar";
import HeroImage from "./HeroImage";

const CardStyle = styled.div`
  box-sizing: border-box;
  border: 1px solid lightgray;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  border-radius: 12px;

  .card-header {
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-content {
    display: flex;
    flex-direction: column;

    p,
    h2,
    h3 {
      margin: 0;
    }
  }
  .card-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    max-width: 100%;
    max-height: 240px;
  }

  .card-counters-container {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
  }

  h3 {
    color: #9b9797;
  }

  .card-counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .card-btn-container {
    .card-btn {
      background-color: ${({ theme }) => theme.colors.secondary};
      text-align: center;
      display: block;
      width: 100%;
      padding: 12px;
      font-size: 1em;
      color: white;
      border: none;
      border-radius: 6px;

      :hover {
        filter: brightness(110%);
        cursor: pointer;
      }
    }
  }
`;

interface DeveloperMemberProps {
  pic?: string;
  name: string;
  team: string;
  description: Text;
  GitUrl: string;
  LinkUrl: string;
}

export default function DeveloperMember() {
  return (
    <CardStyle>
      <MainNavBar />
      <HeroImage />
      <div className="card-btn-container">
        {Developers.map((e) => {
          return (
            <div className="card-counter">
              <img src= {e.pic} width="25%" />
              <div>
                <div className="card-content">
                  <h2 className="card-title">{e.name}</h2>
                  <h3>{e.team}</h3>
                  <h4>{e.description}</h4>
                </div>
              </div>

              <div>{e.GitUrl}</div>
              <div>{e.LinkUrl}</div>
            </div>
          );
        })}
      </div>
    </CardStyle>
  );
}

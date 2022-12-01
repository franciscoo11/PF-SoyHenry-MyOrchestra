import styled from "styled-components";
import { FiMail } from "react-icons/fi";
import { Developers } from "../utils/fakeDB";
import MainNavBar from "./MainNavBar";
import HeroImage from "./HeroImage";
import { isPropertySignature } from "typescript";

const CardStyle = styled.div`
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.lines};
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 8px;
  .card-header {
    height: 170px;
  }

  .card-header img {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-content {
    padding: 0 24px 24px 24px;
  }
  .separator {
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.lines};
    margin-bottom: 20px;
  }
  .orqLocation {
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.light};
  }
  .orqTitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 20px;
    font-weight: 700;
  }

  .description {
    font-size: 16px;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.light};
    min-height: 115px;
  }

  .card-counters-container {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
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
const linkedin =
  "https://res.cloudinary.com/dzup1ckpy/image/upload/v1669911985/logotipo-de-linkedin_y5pq18.png";
const github =
  "https://res.cloudinary.com/dzup1ckpy/image/upload/v1668188969/github_cnhtql.png";
interface DeveloperMemberProps {
  pic: string;
  name: string;
  team: string;
  description: Text;
  GitUrl: string;
  LinkUrl: string;
}

export default function DeveloperMember(props: any) {
  return (
    <>
      <CardStyle>
        <div className="card-content">
          <div className="separator"></div>
          <div className="card-counters-container"></div>
          <div className="card-counter">
            <div className="card-header">
              <img src={props.pic} width="25%" />
            </div>
            <div>
              <div className="card-content">
                <div className="orqTitle">{props.name}</div>
                <div className="orqLocation">{props.team}</div>
                <p className="description">{props.description}</p>
              </div>
            </div>
          </div>
        </div>
      </CardStyle>
    </>
  );
}

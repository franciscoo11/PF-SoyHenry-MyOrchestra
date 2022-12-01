import styled from "styled-components";
import axios from "axios";

const StyledMemberCard = styled.div`
  box-sizing: border-box;
  border: 1px solid black;
  width: 100%;
  position: relative;
  border-radius: 12px;
  border: 1px solid lightgrey;
  overflow: hidden;

  .profile-pic {
    height: 8em;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: grayscale();
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
    padding: 12px 10px;
    p {
      margin: 0;
    }

    .user-role {
      text-transform: uppercase;
      color: gray;
      font-weight: bold;
      font-size: 0.8em;
    }

    .user-name {
      font-weight: bold;
      font-size: 1.1em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card-icons {
      text-align: right;
      margin: 12px 0 0;
    }
  }
`;



export default function DonationCard({ amount, campaignId, orchestraId, userId, isPrivate, date}:any) {

  return (
    <StyledMemberCard>
      <div className="content">
        <p className="user-role">Id usuario: {userId}</p>
        <p className="user-name">Id campaña: {campaignId}</p>
        <h1>Monto: ${amount}</h1>
        <h3>Fecha: {date}</h3>
        <p className="user-role">Id orquesta: {orchestraId}</p>
        <p className="user-role">Privada: {isPrivate ? "Si" : "No"}</p>
      </div>
    </StyledMemberCard>
  );
}

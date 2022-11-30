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

interface MemberCardProps {
  pic: string;
  role: string;
  name: string;
  email: string;
  is_active: boolean;
}

export default function UserCard({ pic, role, name, email, is_active}: MemberCardProps) {
    const logicDelete = async ()=>{
    return await axios.patch(`/api/user/${email}`).then(response=>response.data )  
    }
    const handleClickLogicDelete= async ()=>{
    const response = await logicDelete()
    window.location.href = window.location.href
    return response
    }

  return (
    <StyledMemberCard>
      <div
        className="profile-pic"
        style={{ backgroundImage: `url(${pic})` }}
      ></div>
      {/* <div
        className="orchestra-logo"
        style={{ backgroundImage: `url(${logo})` }}
      ></div> */}
      <div className="content">
        <p className="user-role">{role}</p>
        <p className="user-name">{name}</p>
        {/* <div className="card-icons">
          <FiMail />
        </div> */}
        {is_active ? <button onClick={()=>handleClickLogicDelete()}>
            <a>Desactivar</a>
            </button> : <button onClick={()=>handleClickLogicDelete()}>
            <a>Activar</a>
            </button>}
      </div>
    </StyledMemberCard>
  );
}

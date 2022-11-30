import styled from "styled-components";
import { UpdateCover } from "./orchestras/UpdateCover";
import { prisma } from "../../../lib/prisma";

const StyledDiv = styled.div`
  border-radius: 12px;
  border: 1px solid lightgray;
  overflow: hidden;

  .info {
    padding: 12px 24px;
  }

  .cover {
    width: 100%;
    height: 240px;
    background-size: cover;
    background-position: center;
  }

  .title {
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0;
  }

  p {
    margin: 0;
  }

  .location {
    font-weight: bold;
  }
`;

export default function Cover({
  cover,
  id,
  title,
  location,
  user,
  members,
}: any) {
  const count = members.length;
  return (
    <StyledDiv>
      <div className="cover" style={{ backgroundImage: `url(${cover})` }}>
        {user ? <UpdateCover id={id} /> : null}
      </div>
      <div className="info">
        <h2 className="title">{title}</h2>
        <p className="location">{location}</p>
        <p>{count} integrantes</p>
      </div>
    </StyledDiv>
  );
}

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";

const filesLogo =
  "https://res.cloudinary.com/dzup1ckpy/image/upload/v1668090828/abrir-documento_ifj9cl.png";
const commentLogo =
  "https://res.cloudinary.com/dzup1ckpy/image/upload/v1668090834/comentario_bfcnha.png";
const viewsLogo =
  "https://res.cloudinary.com/dzup1ckpy/image/upload/v1668090840/vista_j8t6ku.png";

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

function HomeCards(props: any) {
  const cookie = new Cookies();

  const dataexist = async () => {
    return await axios
      .get(`/api/favorites/${cookie.get("UserloginData").id}`, {
        params: { orchestra_id: props.id },
      })
      .then((response) => response.data);
  };
  const handleClickFavorite = async () => {
    const responsExist = await dataexist();
    if (responsExist) {
      axios
        .put(`/api/favorites/${cookie.get("UserloginData").id}`, {
          orchestra_id: props.id,
        })
        .then((response) => response.data);
    }

    await axios.post("/api/favorites", {
      orchestra_id: props.id,
      user_id: cookie.get("UserloginData").id,
    });
  };

  return (
    <>
      <CardStyle>
        <div className="card-header">
          <Link href={`/orchestras/${encodeURIComponent(props.id)}`}>
            <img src={props.image} alt={props.title} />
          </Link>
        </div>
        <div className="card-content">
          <div className="separator"></div>
          <div className="orqLocation">{props.subtitle}</div>
          <div className="orqTitle">{props.title}</div>
          <p className="description">{props.content}...</p>

          <div className="card-footer">
            <div className="card-btn-container">
              <Link
                href={`/orchestras/${encodeURIComponent(props.id)}`}
                legacyBehavior
              >
                <a className="card-btn">Ver más</a>
              </Link>
            </div>
          </div>
        </div>
      </CardStyle>
    </>
  );
}

export default HomeCards;

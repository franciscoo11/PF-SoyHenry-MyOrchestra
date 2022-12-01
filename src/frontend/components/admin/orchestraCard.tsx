import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

const CardStyle = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #f5f5f5;
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  gap: 24px;

  .element-container {
    grid-column: 1/10;
    display: grid;
    grid-template-columns: repeat(9, minmax(0, 1fr));
    gap: 24px;
    padding: 6px;
    border-bottom: 2px solid gray;

    .card-header {
      grid-column: 2/3;
      display: flex;
      align-items: center;
      img {
        width: 48px;
        height: auto;
      }
    }

    .card-content {
      grid-column: 3/7;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      div {
        display: flex;
        justify-content: center;
      }
    }

    .card-footer {
      grid-column: 8/10;
      display: flex;
      align-items: center;
    }
  }
`;

function OrchestraCards(props: any) {
  const logicDelete = async () => {
    return await axios
      .patch(`/api/orchestra/${props.id}`)
      .then((response) => response.data);
  };
  const handleClickLogicDelete = async () => {
    const response = await logicDelete();
    window.location.href = window.location.href;
    return response;
  };

  const deleteReal = async () => {
    return await axios
      .delete(`/api/orchestra/${props.id}`)
      .then((response) => response.data);
  };
  const handleClickDeleteReal = async () => {
    Swal.fire({
      title: "Estas seguro de eliminar esta orquesta?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteReal();
        Swal.fire("Eliminada!", "", "success");
        return response;
      } else if (result.isDenied) {
        Swal.fire("Los cambios no fueron guardados", "", "info");
      }
    });
  };

  return (
    <>
      <CardStyle>
        <div className="element-container">
          <div className="card-header">
            <Link href={`/orchestras/${encodeURIComponent(props.id)}`}>
              <img src={props.image} alt={props.title} />
            </Link>
          </div>
          <div className="card-content">
            <div className="orchestra-name">
              <p className="card-title">{props.title}</p>
            </div>
            <div className="location">
              <p>{props.subtitle}</p>
            </div>
          </div>
          <div className="card-footer">
            <div className="card-btn-container">
              {props.is_active ? (
                <button onClick={() => handleClickLogicDelete()}>
                  <a>Desactivar</a>
                </button>
              ) : (
                <button onClick={() => handleClickLogicDelete()}>
                  <a>Activar</a>
                </button>
              )}

              <button onClick={() => handleClickDeleteReal()}>Eliminar</button>
            </div>
          </div>
        </div>
      </CardStyle>
    </>
  );
}

export default OrchestraCards;

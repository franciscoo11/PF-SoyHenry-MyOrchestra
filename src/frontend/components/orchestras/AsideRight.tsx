import { FiHeart } from "react-icons/fi";
import OpenCampaign from "../OpenCampaign";
import Link from "next/link";

export default function AsideRight() {
  return (
    <>
      <div className="donate-container">
        <div className="donate-icon-container">
          <FiHeart />
        </div>
        <div className="donate-info">
          <p className="info-title">
            Entre todos podemos <br /> hacer la diferencia
          </p>
          <p className="info-content">
            Colaborá con esta y/u otras orquestas para que puedan seguir
            adelante con esta hermosa actividad.
          </p>
        </div>
        <div className="donate-btn-container">
          <Link className="donate-btn donate-link-aside" href={"/campaigns"}>
            Donar
          </Link>
        </div>
      </div>
      <OpenCampaign />
    </>
  );
}

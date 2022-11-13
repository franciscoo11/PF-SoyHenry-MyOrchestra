import { FiHeart } from "react-icons/fi";

export default function AsideRight(props: any) {
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
          <button className="donate-btn">Donar</button>
        </div>
      </div>
      <div className="campaign-container">
        <div className="campaign-header">
          <h3 className="campaign-title">Campaña Abierta</h3>
          <p className="campaign-subtitle">Campaña</p>
          <p className="campaign-desc">Viaje de intercambio a Temuco-Chile</p>
          <p className="read-more">leer más</p>
        </div>
        <div className="campaign-details">
          <p className="campaign-goal-title">Objetivo</p>
          <p className="campaign-goal-amount">$75.000</p>
          <p className="campaign-end-title">Finaliza:</p>
          <p className="campaign-end-date">02/02/2023</p>
        </div>
        <div className="campaign-footer">
          <p className="campaig-footer-title">Alcanzado hasta el momento</p>
          <p className="campaign-current-amount">$17.985</p>
          <div className="campaign-progress-bar">
            <div className="campaign-current-progress-bar"></div>
          </div>
          <button className="campaign-btn">Colaborar</button>
        </div>
      </div>
    </>
  );
}

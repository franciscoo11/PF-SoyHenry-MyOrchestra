import { Orquestas, Users } from "../../../frontend/utils/fakeDB";
import {
  FiHome,
  FiInfo,
  FiUsers,
  FiEye,
  FiVideo,
  FiFile,
  FiCalendar,
  FiHeart,
  FiEdit3,
} from "react-icons/fi";
import Link from "next/link";
import { UpdateLogo } from "./UpdateLogo";

export default function AsideLeft({ logo, id, user }: any) {
  return (
    <>
      <div className="orchestra-nav-container">
        <div
          className="orchestra-logo"
          style={{ backgroundImage: `url(${logo})` }}
        >
          <div className="logo-update-icon-container">
            {user ? <UpdateLogo id={id} /> : null}
          </div>
        </div>
        <nav className="orchestra-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <FiHome />
              <div>
                <Link href={`/orchestras/${encodeURIComponent(id)}`}>
                  Inicio
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <FiInfo />
              <div>
                <Link href={`/orchestras/${encodeURIComponent(id)}/about`}>
                  Acerca de
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <FiUsers />
              <div>
                <Link href={`/orchestras/${encodeURIComponent(id)}/members`}>
                  Integrantes
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <FiEye />
              <div>
                <Link href={`/orchestras/${encodeURIComponent(id)}/news`}>
                  Noticias
                </Link>
              </div>
            </li>
            {/* <li className="nav-item">
              <FiVideo />
              <div>
                <Link
                  href={`/orchestras/${encodeURIComponent(props.id)}/media`}
                >
                  Multimedia
                </Link>
              </div>
            </li> */}
            {/* <li className="nav-item">
              <FiFile />
              <div>Archivos</div>
            </li> */}
            <li className="nav-item">
              <FiCalendar />
              <div>
                <Link href={`/orchestras/${encodeURIComponent(id)}/events`}>
                  Eventos
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <FiHeart />
              <div>
                <Link href={`/orchestras/${encodeURIComponent(id)}/campaigns`}>
                  Campañas
                </Link>
              </div>
            </li>
            {user ? (
              <li className="nav-item">
                <FiEdit3 />
                <div>
                  <Link href={`/orchestras/${encodeURIComponent(id)}/edit`}>
                    Editar Orquesta
                  </Link>
                </div>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
      {user ? (
        <div className="notification-container">
          <div
            className="admin-pic"
            style={{ backgroundImage: `url(${Users[1].image})` }}
          ></div>
          <div className="notification-content">
            <p className="user-name">{Users[1].name}</p>
            <p className="user-role">{Users[1].rol}</p>
            <hr />
            <ul className="notifications-list">
              <li className="notification-item">
                Notificaciones <span>3</span>{" "}
              </li>
              <li className="notification-item">
                Mensajes <span>2</span>{" "}
              </li>
              <li className="notification-item">
                Pendiente <span>1</span>{" "}
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}

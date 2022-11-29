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
  FiUser,
  FiSettings,
  FiStar,
  FiMusic,
  FiFileText,
  FiBell,
} from "react-icons/fi";
import Link from "next/link";

export default function UserAsideLeft({ avatar, id }: any) {
  return (
    <>
      <div className="user-nav-container">
        <div
          className="user-pic"
          style={{
            backgroundImage: `url(${avatar ? avatar : "/blank_profile.png"})`,
          }}
        ></div>
        <nav className="user-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <FiUser />
              <div>
                <Link href={`/users/${encodeURIComponent(id)}`}>Principal</Link>
              </div>
            </li>
            <li className="nav-item">
              <FiSettings />
              <div>
                <Link href={`/users/${encodeURIComponent(id)}/edit`}>
                  Mis datos
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <FiStar />
              <div>
                <Link href={`/users/${encodeURIComponent(id)}/favs`}>
                  Favoritos
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <FiMusic />
              <div>
                <Link href={`/orchestras/${encodeURIComponent(id)}`}>
                  Mi orquesta
                </Link>
              </div>
            </li>
            {/* <li className="nav-item">
              <FiFileText />
              <div>
                <Link href={`/users/${encodeURIComponent(props.id)}/files`}>
                  Compartido
                </Link>
              </div>
            </li> */}
            <li className="nav-item">
              <FiFile />
              <div>Notificaciones</div>
            </li>
            {/* <li className="nav-item">
              <FiCalendar />
              <div>
                <Link
                  href={`/orchestras/${encodeURIComponent(props.id)}/events`}
                >
                  Eventos
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <FiHeart />
              <div>
                <Link
                  href={`/orchestras/${encodeURIComponent(props.id)}/campaigns`}
                >
                  Campañas
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <FiEdit3 />
              <div>
                <Link href={`/orchestras/${encodeURIComponent(props.id)}/edit`}>
                  Editar Orquesta
                </Link>
              </div>
            </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
}

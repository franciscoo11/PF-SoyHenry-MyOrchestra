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
  FiKey,
} from "react-icons/fi";
import Link from "next/link";
import { UpdateUserLogo } from "./UpdateUserLogo";

export default function UserAsideLeft({ avatar, email, user }: any) {
  return (
    <>
      <div className="user-nav-container">
        <div
          className="user-pic"
          style={{
            backgroundImage: `url(${avatar ? avatar : "/blank_profile.png"})`,
          }}
        >
          {user ? <UpdateUserLogo email={email} user={user} /> : null}
        </div>
        <nav className="user-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <FiUser />
              <div>
                <Link href={`/users/${encodeURIComponent(email)}`}>
                  Principal
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <FiSettings />
              <div>
                <Link href={`/users/${encodeURIComponent(email)}/edit`}>
                  Mis datos
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <FiKey />
              <div>
                <Link
                  href={`/users/${encodeURIComponent(email)}/changepassword`}
                >
                  Cambiar contraseña
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

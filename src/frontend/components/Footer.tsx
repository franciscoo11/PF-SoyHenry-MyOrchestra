import styled from "styled-components";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";

const StyledFooter = styled.footer`
  background-color: #222;
  .footer-grid {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(16, minmax(0, 1fr));
    gap: 24px;
    padding: 48px 80px;
    color: white;

    .footer-left {
      grid-column: 1/4;
      grid-row: 1;

      p {
        margin: 0;
      }

      .brand-small {
        font-size: 0.7em;
        font-weight: lighter;
      }

      .brand-big {
        font-size: 1.3em;
        font-weight: bold;
      }

      .social-icons-container {
        margin-top: 6px;
        display: flex;
        gap: 12px;
        font-size: 1.5em;
      }
    }

    .footer-center {
      grid-column: 4/14;
      grid-row: 1;
      display: flex;
      align-items: center;

      .footer-nav {
        width: 50%;
        margin: 0 auto;

        .footer-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 24px;
          justify-content: center;
          font-size: 1em;
          font-weight: lighter;
          align-items: center;
        }
      }
    }

    .footer-right {
      grid-column: 14 / 17;
      grid-row: 1;
    }
  }

  .footer-bottom {
    background-color: #1d1d1d;
    color: white;
    text-align: center;
    padding: 12px 80px;
    font-weight: lighter;

    .content {
      margin: 0;
    }
  }
`;

export default function Footer(props: any) {
  const router = useRouter();

  return (
    <StyledFooter>
      <div className="footer-grid">
        <div className="footer-left">
          <p className="brand-small">Red de orquestas populares de</p>
          <p className="brand-big">
            música <br />
            latinoamericana
          </p>
          <div className="social-icons-container">
            <FiFacebook />

            <FiInstagram />

            <FiYoutube />

            <FaWhatsapp
              onClick={() => router.push("https://wa.me/5493425682316")}
            />
          </div>
        </div>
        <div className="footer-center">
          <nav className="footer-nav">
            <ul className="footer-nav-list">
              <Link href="/orchestras">
                <li className="footer-nav-item">Orquestas</li>
              </Link>
              <Link href="/events">
                <li className="footer-nav-item">Eventos</li>
              </Link>
              <Link href="/campaigns">
                <li className="footer-nav-item">Campañas</li>
              </Link>
              <Link href="/news">
                <li className="footer-nav-item">Noticias</li>
              </Link>
              {/* <li className="footer-nav-item">Multimedia</li>
              <li className="footer-nav-item">Acerca de</li> */}
            </ul>
          </nav>
        </div>
        <div className="footer-right"></div>
      </div>
      <div className="footer-bottom">
        <p className="content">
          Proyecto realizado con mucho amor por el <b>Grupo 13 - PF Webft30a</b>{" "}
          de SoyHenry.
        </p>
      </div>
    </StyledFooter>
  );
}

import { useRouter } from "next/router";
import Cover from "../../frontend/components/Cover";
import MainNavBar from "../../frontend/components/MainNavBar";
import { Orquestas, Posts, Users } from "../../frontend/utils/fakeDB";
import styled from "styled-components";
import OrchestraPosts from "../../frontend/components/OrchestraPosts";

export const StyledMain = styled.main`
  margin: 25px auto;
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  gap: 24px;
  padding: 0 80px;

  .aside-left {
    grid-column: 1/4;
  }

  section {
    grid-column: 4/13;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .form-container {
      border: 1px solid lightgrey;
      padding: 24px;
      border-radius: 12px;
      display: flex;
      gap: 12px;

      .post-form {
        width: 100%;
      }

      .post-input {
        background-color: #f1f2f6;
        border: none;
        font-size: 1em;
        width: 100%;
        padding: 12px;
        border-radius: 24px;
      }

      .pic {
        border: 1px solid lightgrey;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background-size: cover;
        background-position: center;
      }
    }

    .filter-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .divider {
        width: 100%;
        height: 1px;
        background-color: lightgrey;
      }

      .post-filter {
        width: 320px;
        text-align: right;
      }
    }

    .posts {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }

  .aside-right {
    grid-column: 13/17;
  }
`;

const StyledNav = styled.nav`
  width: 90%;
  max-width: 1300px;
  margin: 0 auto 100px;
  position: relative;

  .nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
    gap: 20px;

    .nav-item {
      background-color: lightgray;
      padding: 5px 15px;
      border-radius: 10px;
    }
  }
`;

function OrchestraDetails(props: any) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <StyledNav>
            <ul className="nav">
              <li className="nav-item">Inicio</li>
              <li className="nav-item">Información</li>
              <li className="nav-item">Noticias</li>
              <li className="nav-item">Multimedia</li>
              <li className="nav-item">Fotos</li>
            </ul>
          </StyledNav>
        </aside>
        <section className="content">
          <Cover
            cover={Orquestas[0].cover}
            title={Orquestas[0].name}
            location={Orquestas[0].ubication}
          />
          <div className="form-container">
            <div
              className="pic"
              style={{ backgroundImage: `url(${Users[0].image})` }}
            ></div>
            <form className="post-form">
              <input
                className="post-input"
                type="text"
                placeholder="Nueva publicación..."
              />
            </form>
          </div>
          <div className="filter-container">
            <div className="divider"></div>
            <div className="post-filter">
              Ordenar por: <b>Mas recientes</b>
            </div>
          </div>

          <div className="posts">
            {Posts.map((post, index) => (
              <OrchestraPosts key={index} post={post} />
            ))}
          </div>
        </section>
        <aside className="aside-right">Derecha</aside>
      </StyledMain>
    </>
  );
}

export default OrchestraDetails;

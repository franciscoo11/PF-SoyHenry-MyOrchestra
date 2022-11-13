import { useRouter } from "next/router";
import Cover from "../../../frontend/components/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import { Orquestas, Posts, Users } from "../../../frontend/utils/fakeDB";
import OrchestraPosts from "../../../frontend/components/OrchestraPosts";
import { FiVideo, FiImage, FiFileText } from "react-icons/fi";
import Footer from "../../../frontend/components/Footer";
import AsideLeft from "../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../frontend/styles/orchestras/sharedStyles";

function OrchestraDetails(props: any) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <AsideLeft />
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
              style={{ backgroundImage: `url(${Users[1].image})` }}
            ></div>
            <form className="post-form">
              <input
                className="post-input"
                type="text"
                placeholder="Nueva publicación..."
              />
              <div className="post-form-icons-container">
                <FiFileText />
                <FiVideo />
                <FiImage />
              </div>
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
        <aside className="aside-right">
          <AsideRight />
        </aside>
      </StyledMain>
      <Footer />
    </>
  );
}

export default OrchestraDetails;

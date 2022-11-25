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
import { prisma } from "../../../../lib/prisma";
import CreatePosts from "../../../frontend/components/CreatePosts";
import { HOSTNAME } from "../../_app";
import axios from "axios";
import { UpdateCover } from "../../../frontend/components/orchestras/UpdateCover";
import { UpdateLogo } from "../../../frontend/components/orchestras/UpdateLogo";

export interface DataModel {
  id: string;
}

export const getStaticPaths = async () => {
  try {
    const orchestrasById: any =
      await prisma.$queryRaw`SELECT id FROM orchestras`;
    const paths = orchestrasById.map(({ id }: any) => ({ params: { id } }));
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getStaticProps = async ({ params }: any) => {
  try {
    const orchestrasById: any =
      await prisma.$queryRaw`SELECT * FROM orchestras WHERE id = ${params.id}`;
    const response = await axios.get(`${HOSTNAME}/api/typesPosts`);
    const typePost = await response.data;
    return {
      props: {
        orchestrasById,
        typePost,
      },
    };
  } catch (error) {}
};

function OrchestraDetails(props: any) {
  const router = useRouter();
  const { id } = router.query;
  const orchestras = props.orchestrasById[0];
  console.log(props.commentsPosts);

  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <UpdateLogo orchestrasById={props.orchestrasById} />
          <AsideLeft logo={orchestras.logo} id={orchestras.id} />
        </aside>
        <section className="content">
          <Cover
            cover={orchestras.cover}
            title={orchestras.name}
            location={orchestras.location}
          />
          <UpdateCover orchestrasById={props.orchestrasById} />
          <div className="form-container">
            <div
              className="pic"
              style={{ backgroundImage: `url(${Users[1].image})` }}
            ></div>
            {/* <form className="post-form">
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
            </form> */}
            <CreatePosts typePost={props.typePost} />
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

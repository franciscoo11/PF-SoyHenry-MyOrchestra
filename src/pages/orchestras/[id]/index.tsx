import Cover from "../../../frontend/components/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import { Orquestas, Posts, Users } from "../../../frontend/utils/fakeDB";
import OrchestraPosts from "../../../frontend/components/OrchestraPosts";
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

// export const getStaticPaths = async () => {
//   try {
//     const orchestrasById: any =
//       await prisma.$queryRaw`SELECT id FROM orchestras`;
//     const paths = orchestrasById.map(({ id }: any) => ({ params: { id } }));
//     return {
//       paths,
//       fallback: false,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getStaticProps = async ({ params }: any) => {
//   try {
//     const orchestrasById: any =
//       await prisma.$queryRaw`SELECT * FROM orchestras WHERE id = ${params.id}`;
//     const response = await axios.get(`${HOSTNAME}/api/typesPosts`);
//     const typePost = await response.data;
//     return {
//       props: {
//         orchestrasById,
//         typePost,
//       },
//     };
//   } catch (error) {}
// };

export async function getServerSideProps({ params }: any) {
  try {
    const orchestra = await prisma.orchestras.findUnique({
      where: {
        id: params.id,
      },
    });
    const postTypes = await prisma.type_post.findMany();

    return { props: { orchestra, postTypes } };
  } catch (error) {
    console.log(error);
  }
}

function OrchestraDetails({ orchestra, postTypes }: any) {
  const { id, name, description, logo, cover, location } = orchestra;

  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          {/* <UpdateLogo orchestrasById={props.orchestrasById} /> */}
          <AsideLeft logo={logo} id={id} />
        </aside>
        <section className="content">
          <Cover cover={cover} title={name} location={location} />
          {/* <UpdateCover orchestrasById={props.orchestrasById} /> */}
          <div className="form-container">
            <CreatePosts typePost={postTypes} />
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

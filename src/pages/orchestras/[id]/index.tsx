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
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";

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

    return { props: { orchestra } };
  } catch (error) {
    console.log(error);
  }
}

function OrchestraDetails({ orchestra }: any) {
  const { id, name, description, logo, cover, location } = orchestra;
  const { user } = useUser();
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/user/${user.email}`)
        .then((res: any) => setUserId(res.data.id));
    }
  }, [user]);

  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <AsideLeft logo={logo} id={id} />
        </aside>
        <section className="content">
          <Cover cover={cover} title={name} location={location} />
          {/* <UpdateCover orchestrasById={props.orchestrasById} /> */}
          {user ? (
            <div className="form-container">
              {<CreatePosts orchestraId={id} userCreator={userId} />}
            </div>
          ) : null}
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

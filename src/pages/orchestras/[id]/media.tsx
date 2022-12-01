import { useRouter } from "next/router";
import Cover from "../../../frontend/components/orchestras/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import { Users, Posts } from "../../../frontend/utils/fakeDB";
import Footer from "../../../frontend/components/Footer";
import AsideLeft from "../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../lib/prisma";
import axios from "axios";
import MemberCard from "../../../frontend/components/MemberCards";
import MediaCard from "../../../frontend/components/MediaCards";

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
    return {
      props: {
        orchestrasById,
      },
    };
  } catch (error) {}
};

function OrchestraMedia(props: any) {
  const router = useRouter();
  const { id } = router.query;
  const orchestras = props.orchestrasById[0];
  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <AsideLeft logo={orchestras.logo} id={orchestras.id} />
        </aside>
        <section className="content">
          <Cover
            cover={orchestras.cover}
            title={orchestras.name}
            location={orchestras.location}
          />
          <div className="about-container">
            <h2 className="about-title">Galería Multimedia</h2>
            <p className="about-content">{orchestras.description}</p>
          </div>

          <div className="filter-container">
            <div className="divider"></div>
            <div className="post-filter">
              Ordenar por: <b>Mas recientes</b>
            </div>
          </div>

          <div className="media-container">
            {Posts.map((post, index) => (
              <MediaCard key={index} pic={post.media} title={post.title} />
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

export default OrchestraMedia;

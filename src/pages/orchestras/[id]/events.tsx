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
import axios from "axios";
import OrchestraEventCard from "../../../frontend/components/OrchestraEventCard";

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

function OrchestraEvents(props: any) {
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
            <h2 className="about-title">Próximos Eventos</h2>
            <p className="about-content">{orchestras.description}</p>
          </div>

          <div className="filter-container">
            <div className="divider"></div>
            <div className="post-filter">
              Ordenar por: <b>Mas recientes</b>
            </div>
          </div>

          <div className="posts">
            {Posts.map(
              (
                {
                  title,
                  event_day,
                  event_hour,
                  media,
                  content,
                  event_location,
                },
                index
              ) => (
                <OrchestraEventCard
                  key={index}
                  title={title}
                  day={event_day}
                  hour={event_hour}
                  image={media}
                  description={content}
                  location={event_location}
                />
              )
            )}
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

export default OrchestraEvents;

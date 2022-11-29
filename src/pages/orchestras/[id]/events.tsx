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
import CreateEvent from "../../../frontend/components/CreateEvent";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";

export interface DataModel {
  id: string;
}

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

function OrchestraEvents({ orchestra }: any) {
  const { id, name, description, logo, cover, location } = orchestra;
  const { user } = useUser();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (user) {
      axios
        .get(`/api/user/${user.email}`)
        .then((res: any) => setUserId(res.data.id))
        .finally(() => setLoading(false));
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
          <div className="about-container">
            <h2 className="about-title">Próximos Eventos</h2>
            <p className="about-content">{description}</p>
          </div>
          {user ? (
            <div className="form-container">
              {<CreateEvent orchestraId={id} userCreator={userId} />}
            </div>
          ) : null}

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

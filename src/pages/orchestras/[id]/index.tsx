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
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";

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
          <AsideLeft logo={logo} id={id} user={user} />
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

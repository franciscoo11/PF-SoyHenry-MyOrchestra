import { useRouter } from "next/router";
import Cover from "../../../frontend/components/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import { Orquestas } from "../../../frontend/utils/fakeDB";
import Footer from "../../../frontend/components/Footer";
import AsideLeft from "../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../lib/prisma";
import { useUser } from "@auth0/nextjs-auth0";

export async function getServerSideProps({ params }: any) {
  try {
    const orchestra = await prisma.orchestras.findUnique({
      where: {
        id: params.id,
      },
    });

    const members = await prisma.users_on_orchestra.findMany({
      where: {
        orchestraId: params.id,
      },
      include: {
        user: true,
        rol: true,
      },
    });

    return { props: { orchestra, members } };
  } catch (error) {
    console.log(error);
  }
}

function OrchestraAbout({ orchestra, members }: any) {
  const { id, name, description, logo, cover, location } = orchestra;
  const { user } = useUser();

  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <AsideLeft logo={logo} id={id} user={user} />
        </aside>
        <section className="content">
          <Cover
            cover={cover}
            title={name}
            location={location}
            id={id}
            user={user}
            members={members}
          />
          <div className="about-container">
            <h2 className="about-title">Acerca de</h2>
            <p className="about-content">{description}</p>
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

export default OrchestraAbout;

import { useRouter } from "next/router";
import Cover from "../../../frontend/components/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import { Campaigns, Posts, Users } from "../../../frontend/utils/fakeDB";
import Footer from "../../../frontend/components/Footer";
import AsideLeft from "../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../lib/prisma";
import CampaignForm from "../../../frontend/components/orchestras/CampaignForm";
import OrchestraEditForm from "../../../frontend/components/OrchestraEditForm";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

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

    const members = await prisma.users_on_orchestra.findMany({
      where: {
        orchestraId: params.id,
      },
      include: {
        user: true,
        rol: true,
      },
    });

    const types_orchestras = await prisma.orchestra_type.findMany();

    return { props: { orchestra, members, types_orchestras } };
  } catch (error) {
    console.log(error);
  }
}

export default withPageAuthRequired(function OrchestraCreateCampaign({
  orchestra,
  members,
  types_orchestras,
}: any) {
  const router = useRouter();
  const { user } = useUser();
  const { id, logo, cover, name, location } = orchestra;

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
          <h2 className="campaign-form-title">Editar Orquesta</h2>
          <OrchestraEditForm
            orchestra={orchestra}
            types_orchestras={types_orchestras}
          />
        </section>
        <aside className="aside-right">
          <AsideRight />
        </aside>
      </StyledMain>
      <Footer />
    </>
  );
});

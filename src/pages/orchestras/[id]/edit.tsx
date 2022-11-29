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
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

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
    const orchestraQuery: any =
      await prisma.$queryRaw`SELECT * FROM orchestras WHERE id = ${params.id}`;
    const types_orchestras =
      await prisma.$queryRaw`SELECT * FROM orchestra_type`;
    const orchestra = orchestraQuery[0];

    return {
      props: {
        orchestra,
        types_orchestras,
      },
    };
  } catch (error) {}
};

export default withPageAuthRequired(function OrchestraCreateCampaign({
  orchestra,
  types_orchestras,
}: any) {
  const router = useRouter();
  // const { id } = router.query;

  const { id, logo, cover, name, location } = orchestra;

  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <AsideLeft logo={logo} id={id} />
        </aside>
        <section className="content">
          <Cover cover={cover} title={name} location={location} />
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

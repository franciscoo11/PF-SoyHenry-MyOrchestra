import { useRouter } from "next/router";
import Cover from "../../../../frontend/components/Cover";
import MainNavBar from "../../../../frontend/components/MainNavBar";
import { Campaigns, Posts, Users } from "../../../../frontend/utils/fakeDB";
import Footer from "../../../../frontend/components/Footer";
import AsideLeft from "../../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../../lib/prisma";
import CampaignForm from "../../../../frontend/components/orchestras/CampaignForm";

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

function OrchestraCreateCampaign(props: any) {
  const router = useRouter();
  // const { id } = router.query;
  const orchestra = props.orchestrasById[0];

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
          <h2 className="campaign-form-title">Nueva Campaña</h2>
          <CampaignForm orchestra={orchestra} />
        </section>
        <aside className="aside-right">
          <AsideRight />
        </aside>
      </StyledMain>
      <Footer />
    </>
  );
}

export default OrchestraCreateCampaign;

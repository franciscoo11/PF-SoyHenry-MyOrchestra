import { prisma } from "../../../lib/prisma";
import CreateCampaigns from "../../frontend/components/CreateCampaigns";

export const getStaticProps = async () => {
  try {
    const orchestra: any = await prisma.$queryRaw`SELECT * FROM orchestras`;
    return {
      props: {
        orchestra,
      },
    };
  } catch (error) {}
};

export default function CampaignCreate(props: any) {
  return (
    <>
      <CreateCampaigns orchestra={props.orchestra} />
    </>
  );
}

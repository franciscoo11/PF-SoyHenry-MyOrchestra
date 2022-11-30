import Cover from "../../../../frontend/components/Cover";
import MainNavBar from "../../../../frontend/components/MainNavBar";
import Footer from "../../../../frontend/components/Footer";
import AsideLeft from "../../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../../lib/prisma";
import CampaignForm from "../../../../frontend/components/orchestras/CampaignForm";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import axios from "axios";

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

export default withPageAuthRequired(function OrchestraCreateCampaign({
  orchestra,
  members,
}: any) {
  const { id, name, description, logo, cover, location } = orchestra;
  const { user } = useUser();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(true);

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
});

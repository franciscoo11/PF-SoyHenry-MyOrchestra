import { useRouter } from "next/router";
import Cover from "../../../../frontend/components/Cover";
import MainNavBar from "../../../../frontend/components/MainNavBar";
import { Campaigns, Posts, Users } from "../../../../frontend/utils/fakeDB";
import Footer from "../../../../frontend/components/Footer";
import AsideLeft from "../../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../../lib/prisma";
import OrchestraCampaignCard from "../../../../frontend/components/OrchestraCampaignCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
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

    const campaigns = await prisma.campaigns.findMany({
      orderBy: { end_date: "asc" },
      where: {
        orchestraId: params.id,
      },
      include: {
        donations: true,
      },
    });

    return {
      props: {
        orchestra,
        members,
        campaigns: JSON.parse(JSON.stringify(campaigns)),
      },
    };
  } catch (error) {
    console.log(error);
  }
}

function OrchestraCampaigns({ orchestra, members, campaigns }: any) {
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
            <h2 className="about-title">Campañas de recaudación de fondos</h2>
            <p className="about-content">{description}</p>
          </div>

          {/* <div className="filter-container">
            <div className="divider"></div>
            <div className="post-filter">
              Ordenar por: <b>Mas recientes</b>
            </div>
          </div> */}

          <div className="posts">
            {campaigns.map(
              ({
                orchestraId,
                title,
                description,
                goal_amount,
                end_date,
                id,
                donations,
              }: any) => (
                <OrchestraCampaignCard
                  key={id}
                  id={id}
                  title={title}
                  end={end_date}
                  description={description}
                  goal={goal_amount}
                  orchestraId={orchestraId}
                  donations={donations}
                />
              )
            )}
          </div>
        </section>
        <aside className="aside-right">
          <div className="create-campaign-btn-container">
            <Link
              href={`/orchestras/${encodeURIComponent(id)}/campaigns/create`}
              className="create-campaign-btn"
            >
              Crear Campaña
            </Link>
          </div>
          <AsideRight />
        </aside>
      </StyledMain>
      <Footer />
    </>
  );
}

export default OrchestraCampaigns;

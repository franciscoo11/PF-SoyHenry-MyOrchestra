import { useRouter } from "next/router";
import Cover from "../../../frontend/components/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import Footer from "../../../frontend/components/Footer";
import AsideLeft from "../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../lib/prisma";
import MemberCard from "../../../frontend/components/MemberCards";
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

function OrchestraMembers({ orchestra, members }: any) {
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
          <div className="members-container">
            <h2 className="members-title">Integrantes</h2>
            <div className="members-content">
              {members.map((member: any) => {
                const rol = member.rol.name;
                const { id, avatar, name, email } = member.user;

                return (
                  <MemberCard
                    key={id}
                    pic={avatar}
                    logo={logo}
                    role={rol}
                    name={name}
                    email={email}
                  />
                );
              })}
            </div>
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

export default OrchestraMembers;

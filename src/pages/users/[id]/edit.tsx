import { useRouter } from "next/router";
import MainNavBar from "../../../frontend/components/MainNavBar";
import Footer from "../../../frontend/components/Footer";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../lib/prisma";
import UserAsideLeft from "../../../frontend/components/users/AsideLeft";
import UserCover from "../../../frontend/components/users/Cover";
import EditUser from "../../../frontend/components/users/EditForm";

export const getServerSideProps = async ({ params }: any) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: params.id,
      },
    });

    const orchestras = await prisma.orchestras.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    const userRoles = await prisma.rols.findMany();

    return { props: { user, orchestras, userRoles } };
  } catch (error) {
    console.log(error);
  }
};

export default function User({ user, orchestras, userRoles }: any) {
  const router = useRouter();
  const {
    avatar,
    birthday,
    city,
    country,
    email,
    name,
    rolId,
    password,
    state,
    cover,
  } = user;

  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <UserAsideLeft avatar={avatar} email={email} user={user} />
        </aside>
        <section className="content">
          <UserCover cover={cover} title={name} location={city} rolId={rolId} />
          <h2 className="user-form-title">Información Personal</h2>

          <EditUser user={user} orchestras={orchestras} userRoles={userRoles} />
        </section>
        <aside className="aside-right">
          <AsideRight />
        </aside>
      </StyledMain>
      <Footer />
    </>
  );
}

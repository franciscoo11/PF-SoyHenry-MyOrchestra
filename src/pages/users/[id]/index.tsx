import { useRouter } from "next/router";
import Cover from "../../../frontend/components/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import Footer from "../../../frontend/components/Footer";
import AsideLeft from "../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../lib/prisma";
import axios from "axios";
import UserAsideLeft from "../../../frontend/components/users/AsideLeft";
import UserCover from "../../../frontend/components/users/Cover";

export const getServerSideProps = async ({ params }: any) => {
  const user = await prisma.users.findUnique({
    where: {
      email: params.id,
    },
  });
  return { props: { user } };
};
export default function User({ user }: any) {
  const router = useRouter();
  const { avatar, birthday, city, country, cover, email, name, rolId } = user;
  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <UserAsideLeft avatar={avatar} id={email} />
        </aside>
        <section className="content">
          <UserCover cover={cover} title={name} location={city} rolId={rolId} />
          <div className="about-container">
            <h2 className="about-title">Acerca de {name}</h2>
            <p className="about-content">about</p>
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

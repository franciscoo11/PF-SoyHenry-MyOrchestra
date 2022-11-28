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

export interface DataModel {
  id: string;
}

export const getServerSideProps = async ({ params }: any) => {
  const user = await prisma.users.findUnique({
    where: {
      id: params.id,
    },
  });
  return { props: { user } };
};
export default function User({ user }: any) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <UserAsideLeft logo={user.avatar} id={user.id} />
        </aside>
        <section className="content">
          <UserCover
            cover={user.cover}
            title={user.name}
            location={user.city}
          />
          <div className="about-container">
            <h2 className="about-title">Acerca de {user.name}</h2>
            <p className="about-content">{user.about}</p>
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

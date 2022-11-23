import { useRouter } from "next/router";
import Cover from "../../../frontend/components/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import { Orquestas, Users } from "../../../frontend/utils/fakeDB";
import Footer from "../../../frontend/components/Footer";
import AsideLeft from "../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../lib/prisma";
import axios from "axios";
import UserAsideLeft from "../../../frontend/components/users/AsideLeft";
import UserCover from "../../../frontend/components/users/Cover";
import EditUser from "../../../frontend/components/users/EditForm";
import { HOSTNAME } from "../../_app";

export interface DataModel {
  id: string;
}

export default function User({ allRols }: any) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <UserAsideLeft logo={Users[0].image} id={Users[0].id} />
        </aside>
        <section className="content">
          <UserCover
            cover={Users[0].cover}
            title={Users[0].name}
            location={Users[0].city}
          />
          <EditUser allRols={allRols} />
        </section>
        <aside className="aside-right">
          <AsideRight />
        </aside>
      </StyledMain>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const rols = await axios.get(`${HOSTNAME}/api/rols`);
  const allRols = await rols.data;

  return {
    props: {
      allRols,
    },
  };
};

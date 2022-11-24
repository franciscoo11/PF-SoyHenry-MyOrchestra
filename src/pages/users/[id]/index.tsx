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

export interface DataModel {
  id: string;
}

export default function User(props: any) {
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
          <div className="about-container">
            <h2 className="about-title">Acerca de {Users[0].name}</h2>
            <p className="about-content">{Users[0].about}</p>
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

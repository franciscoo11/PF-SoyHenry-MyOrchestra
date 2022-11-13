import { useRouter } from "next/router";
import Cover from "../../../frontend/components/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import { Orquestas } from "../../../frontend/utils/fakeDB";
import Footer from "../../../frontend/components/Footer";
import AsideLeft from "../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../frontend/styles/orchestras/sharedStyles";

function OrchestraAbout(props: any) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <AsideLeft />
        </aside>
        <section className="content">
          <Cover
            cover={Orquestas[0].cover}
            title={Orquestas[0].name}
            location={Orquestas[0].ubication}
          />
          <div className="about-container">
            <h2 className="about-title">Acerca de</h2>
            <p className="about-content">
              Et aut enim totam asperiores voluptas provident corporis aperiam
              aliquam. Quidem exercitationem illo eligendi molestias. Animi
              beatae error esse est rem consequatur sit. Non eos repellendus
              maxime ut eum. Molestias nemo officiis minus repellat voluptas aut
              sunt harum.{" "}
            </p>
            <p>
              Aspernatur quas sint placeat. Et sunt eos quia. Molestiae pariatur
              architecto itaque mollitia et eius optio. Sunt et aut magni qui
              vitae neque vero aut.{" "}
            </p>
            <p>
              Voluptates et doloribus enim et aut autem qui. Modi ullam quis
              quasi. Nobis voluptatibus inventore et debitis eum aut sint
              possimus. Cum itaque ut. Autem atque expedita.
            </p>
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

export default OrchestraAbout;

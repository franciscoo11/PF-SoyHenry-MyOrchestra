import { useRouter } from "next/router";
import Cover from "../../../frontend/components/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import { Orquestas } from "../../../frontend/utils/fakeDB";
import Footer from "../../../frontend/components/Footer";
import AsideLeft from "../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../frontend/styles/orchestras/sharedStyles";
import axios from "axios";

export interface DataModel {
  id: string;
}

export const getStaticPaths = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/orchestra");
    const data: DataModel[] = await res.data;
    const paths = data.map(({ id }) => ({ params: { id } }));
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getStaticProps = async ({ params }: any) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/orchestra/${params.id}`
    );
    const data = await res.data;
    return {
      props: {
        data,
      },
    };
  } catch (error) {}
};

function OrchestraAbout(props: any) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <AsideLeft logo={props.data.logo} id={props.data.id} />
        </aside>
        <section className="content">
          <Cover
            cover={props.data.cover}
            title={props.data.name}
            location={props.data.location}
          />
          <div className="about-container">
            <h2 className="about-title">Acerca de</h2>
            <p className="about-content">{props.data.description}</p>
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

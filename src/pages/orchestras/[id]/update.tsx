import { useRouter } from "next/router";
import Cover from "../../../frontend/components/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import Footer from "../../../frontend/components/Footer";
import AsideLeft from "../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../lib/prisma";
import UpdateOrchestra from "../../../frontend/components/UpdateOrchestra";

export interface DataModel {
  id: string;
}

export const getStaticPaths = async () => {
  try {
    const orchestrasById: any =
      await prisma.$queryRaw`SELECT id FROM orchestras`;
    const paths = orchestrasById.map(({ id }: any) => ({ params: { id } }));

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
    const orchestrasById: any =
      await prisma.$queryRaw`SELECT * FROM orchestras WHERE id = ${params.id}`;
    const types_orchestras: any =
      await prisma.$queryRaw`SELECT * FROM orchestra_type`;
    return {
      props: {
        orchestrasById,
        types_orchestras,
      },
    };
  } catch (error) {}
};

function OrchestraUpdate(props: any) {
  const router = useRouter();
  const orchestras = props.orchestrasById[0];
  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <AsideLeft logo={orchestras.logo} id={orchestras.id} />
        </aside>
        <section className="content">
          <Cover
            cover={orchestras.cover}
            title={orchestras.name}
            location={orchestras.location}
          />
          <div className="update-container">
            <h2 className="update-title">Editar orquesta</h2>
            <UpdateOrchestra
              orchestrasById={props.orchestrasById}
              types_orchestras={props.types_orchestras}
            />
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

export default OrchestraUpdate;

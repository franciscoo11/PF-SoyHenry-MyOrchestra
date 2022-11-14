import UpdateOrchestra from "../../../frontend/components/UpdateOrchestra";
import axios from "axios";
import Footer from "../../../frontend/components/Footer";

export default function Update(props: any) {
  return (
    <>
      <UpdateOrchestra types_orchestras={props.types_orchestras} />
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/orchestras-types");
  const types_orchestras = await res.data;

  return {
    props: {
      types_orchestras,
    },
  };
};

import UpdateOrchestra from "../../../frontend/components/UpdateOrchestra";
import axios from "axios";
import { HOSTNAME } from "../../_app";

export default function Update(props: any) {
  return (
    <>
      <UpdateOrchestra types_orchestras={props.types_orchestras} />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${HOSTNAME}/api/orchestras-types`);
  const types_orchestras = await res.data;

  return {
    props: {
      types_orchestras,
    },
  };
};

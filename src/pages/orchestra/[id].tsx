import { useRouter } from "next/router";

function OrchestraDetails(props: any) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <h1>Muro de la Orquesta #{id}</h1>
    </>
  );
}

export default OrchestraDetails;

import NavAdmin from "../../frontend/components/admin/navAdmin";
import Link from "next/link";
import AdminOrchestras from "./orchestras";
import { prisma } from "../../../lib/prisma";

export default function AdminDashboard({ orchestraTypes }: any) {
  return (
    <>
      <NavAdmin />
      <AdminOrchestras orchestraTypes={orchestraTypes} />
    </>
  );
}

export async function getServerSideProps() {
  const orchestraTypes = await prisma.orchestra_type.findMany();
  return {
    props: { orchestraTypes },
  };
}

import NavAdmin from "../../frontend/components/admin/navAdmin";
import Link from "next/link";
import AdminOrchestras from "./orchestras";
import { prisma } from "../../../lib/prisma";
import styled from "styled-components";

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

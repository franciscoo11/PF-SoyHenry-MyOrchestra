import Link from "next/link";

export default function NavAdmin(propr: any) {
  return (
    <nav>
      <Link href="/admin/orchestras">Orquestas</Link>

      {/* <Link href="/orchestras">Orquestas </Link> */}

      {/* <Link href="/news">Noticias </Link> */}

    </nav>
  );
}
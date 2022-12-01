import Link from "next/link";

export default function NavAdmin(propr: any) {
  return (
    <nav>
      <Link href="/admin/orchestras">Orquestas</Link>

      <Link href="/admin/users">Usuarios </Link>

      <Link href="/admin/donations">Donaciones </Link>

    </nav>
  );
}

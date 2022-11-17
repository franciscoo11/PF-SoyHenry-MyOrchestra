import Link from "next/link";

export default function Nav(propr: any) {
  return (
    <nav>
      <Link href="/">Inicio</Link>

      <Link href="/orchestra">Orquestas </Link>

      <Link href="#">Noticias </Link>

      <Link href="#">Eventos </Link>

      <Link href="#">Multimedia </Link>

      <Link href="#">Campañas </Link>

      <Link href="#">Acerca de </Link>
    </nav>
  );
}

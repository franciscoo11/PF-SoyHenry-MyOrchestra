import Link from "next/link";

export default function Nav(propr: any) {
  return (
    <nav>
      <Link href="/">Inicio</Link>

      <Link href="/orchestras">Orquestas </Link>

      <Link href="/news">Noticias </Link>

      <Link href="/events">Eventos </Link>

      {/* <Link href="#">Multimedia </Link> */}

      <Link href="/campaigns">Campañas </Link>

      {/* <Link href="#">Acerca de </Link> */}
    </nav>
  );
}

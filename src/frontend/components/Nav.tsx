import Link from "next/link";

export default function Nav(props: any) {
  return (
    <nav>
      <div className="desktopNav">
        <Link href="/">Inicio</Link>

        <Link href="/orchestras">Orquestas </Link>

        <Link href="/news">Noticias </Link>

        <Link href="/events">Eventos </Link>

        {/* <Link href="#">Multimedia </Link> */}

        <Link href="/campaigns">Campañas </Link>

        {/* <Link href="#">Acerca de </Link> */}
      </div>
      <div className="mobileNav">
        <Link href="/">
          <img src="/images/assets/iconhome.png" />
        </Link>

        <Link href="/orchestras">
          <img src="/images/assets/iconmusic.png" />
        </Link>

        <Link href="/news">
          <img src="/images/assets/iconnews.png" />
        </Link>

        <Link href="/events">
          <img src="/images/assets/iconevents.png" />
        </Link>

        {/* <Link href="#"><img src='/assets/iconhome.png'/></Link> */}

        <Link href="/campaigns">
          <img src="/images/assets/iconheart.png" />
        </Link>

        {/* <Link href="#">Acerca de </Link> */}
      </div>
    </nav>
  );
}

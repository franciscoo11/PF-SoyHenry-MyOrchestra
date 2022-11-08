import Link from "next/link";

export default function MainNavBar() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/orchest">Orquestas </Link>
          </li>
          <li>
            <Link href="/news">Noticias </Link>
          </li>
          <li>
            <Link href="/events">Eventos </Link>
          </li>
          <li>
            <Link href="/media">Multimedia </Link>
          </li>
          <li>
            <Link href="/campaign">Campañas </Link>
          </li>
          <li>
            <Link href="/about">Acerca de </Link>
          </li>
        </ul>
      </nav>
      <div>
        <input type="text" placeholder="Buscar..." />
        {/* input only for example */}
      </div>
    </header>
  );
}

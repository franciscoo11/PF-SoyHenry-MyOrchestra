import Link from "next/link";

export default function LoggedOut() {
  return (
    <div>
      <Link href="/api/auth/login" className="log">
        Iniciar sesión
      </Link>
    </div>
  );
}

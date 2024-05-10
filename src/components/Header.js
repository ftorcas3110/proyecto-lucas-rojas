import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { logout } from "@/lib/actions";

async function Header() {
  const session = await auth();

  // Contenidos para la primera fila
  const firstRowContent = [
    { href: "/mislicitaciones", text: "Mis licitaciones" },
    { href: "/asignadas", text: "Asignadas" },
    { href: "/dashboard", text: "Todas las licitaciones" },
    { href: "/busqueda", text: "Buscador" }
  ];

  // Contenidos para la segunda fila
  const secondRowContent = [
    { href: "/calendario", text: "Calendario" },
    { href: "/dashboard/new", text: "Nueva licitación" },
    { href: "/estadisticas", text: "Estadísticas" }
  ];

  return (
    <header className={`bg-gray-300 text-black flex md:flex-row justify-between items-center md:justify-between md:px-5 py-2 font-Rounded font-bold mb-3`}>
      <div className="hidden lg:flex">
        <a href="/">
          <Image src="/images/logo.png" alt="" width={100} height={24} />
        </a>
      </div>
      {session && (
        <div className="w-[80vw]">
          <ul className="flex text-black items-center justify-center">
            {firstRowContent.map((item, index) => (
              <li key={index} className="text-center w-1/4">
                <Link className="transition duration-500 hover:text-blue-500" href={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
          <ul className="flex text-black items-center justify-center pt-[10px]">
            {secondRowContent.map((item, index) => (
              <li key={index} className="text-center w-1/4">
                <Link className="transition duration-500 hover:text-blue-500" href={item.href}>{item.text}</Link>
              </li>
            ))}
            {session?.user?.role == 'ADMIN' && (
              <li className="text-center w-1/4">
                <Link href="/registro" className="transition duration-500 hover:text-blue-500">Añadir usuario</Link>
              </li>
            )}
          </ul>
        </div>
      )}
      <div className="flex flex-col items-center">
        {session ? (
          <>
            <p className="text-black mb-2 text-center">Sesión iniciada como<br />{session.user.name}</p>
            <div>
              <form>
                <button formAction={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Cerrar sesión</button>
              </form>
            </div>
          </>
        ) : (
          <p className="text-black">Aún no has iniciado sesión</p>
        )}
      </div>
    </header>
  );
}

export default Header;

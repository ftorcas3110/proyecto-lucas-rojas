import Link from "next/link";
import Image from "next/image";
import { logout } from "@/lib/actions";

function Header({ session }) {

  // Contenidos para la primera fila
  const firstRowContent = [
    { href: "/mislicitaciones", text: "Mis licitaciones" },
    { href: "/dashboard", text: "Todas las licitaciones" },
    { href: "/busqueda", text: "Buscador" },
    { href: "/estadisticas", text: "Estadísticas" }
  ];

  // Contenidos para la segunda fila
  const secondRowContent = [
    { href: "/calendario", text: "Calendario" },
    { href: "/adjudicadas", text: "Adjudicadas" },
    { href: "/dashboard/new", text: "Nueva licitación" },
  ];

  return (
    <header className="bg-blue-100 text-black flex md:flex-row justify-between fixed top-0 left-0 right-0 z-10 items-center md:justify-between md:px-5 py-2 font-Rounded font-bold mb-3">
      <div className="hidden lg:flex">
        <Link href="/">
          <Image src="/images/logo.png" alt="Logo" width={100} height={24} />
        </Link>
      </div>
      {session && (
        <div className="w-[80vw] flex justify-center">
          <div className="relative group">
            <span className="p-2 rounded cursor-default">
              Estadísticas licitaciones<span className="text-xs">▼</span>
            </span>
            <ul className="absolute bg-white border rounded shadow-md mt-0 hidden group-hover:block z-50 inset-x-0">
              {firstRowContent.map((item, index) => (
                <Link href={item.href} key={index}>
                  <li className="p-2 hover:bg-blue-300 transition duration-300 text-center">
                    {item.text}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="relative ml-4 group">
            <span className="p-2 rounded cursor-default relative">
              Base de datos<span className="text-xs">▼</span>
            </span>
            <ul className="absolute bg-white border rounded shadow-md mt-0 hidden group-hover:block z-50 inset-x-0">
              {secondRowContent.map((item, index) => (
                <Link href={item.href} key={index}>
                  <li className="p-2 hover:bg-blue-300 transition duration-300 text-center">
                    {item.text}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          {session.user.role === 'ADMIN' && (
            <div className="ml-4">
              <Link href="/registro" className="transition duration-500 hover:text-blue-500">Añadir usuario</Link>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col items-center">
        {session ? (
          <>
            <p className="text-black mb-2 text-center">Sesión iniciada como<br />{session.user.name}</p>
            <div>
              <form>
                <button formAction={logout} className="bg-[#64c0df] hover:bg-[#4d9bb4] transition duration-300 text-black font-bold py-2 px-4 rounded">Cerrar sesión</button>
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

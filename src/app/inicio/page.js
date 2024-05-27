import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const sesion = await auth();
  if (!sesion) redirect('/');
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] py-5 px-5">
      <h1 className="text-3xl md:text-4xl mb-5 text-center text-gray-800">¡Bienvenid@, {sesion?.user?.name}!</h1>
      <p className="mb-8 text-center text-gray-600">¿Dónde te gustaría ir?</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Link href="/dashboard">
          <button className="flex items-stretch justify-center w-full border border-gray-300 rounded-lg shadow-md hover:bg-blue-300 transition duration-300">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">Todas las licitaciones</h2>
              <p className="text-gray-700">Explora todas las licitaciones disponibles.</p>
            </div>
          </button>
        </Link>
        <Link href="/mislicitaciones">
          <button className="flex items-stretch justify-center w-full border border-gray-300 rounded-lg shadow-md hover:bg-blue-300 transition duration-300">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">Mis licitaciones</h2>
              <p className="text-gray-700">Administra tus licitaciones activas.</p>
            </div>
          </button>
        </Link>
        <Link href="/buscador">
          <button className="flex items-stretch justify-center w-full border border-gray-300 rounded-lg shadow-md hover:bg-blue-300 transition duration-300">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">Buscador</h2>
              <p className="text-gray-700">Encuentra licitaciones específicas.</p>
            </div>
          </button>
        </Link>
        <Link href="/adjudicadas">
          <button className="flex items-stretch justify-center w-full border border-gray-300 rounded-lg shadow-md hover:bg-blue-300 transition duration-300">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">Licitaciones adjudicadas</h2>
              <p className="text-gray-700">Visualiza licitaciones adjudicadas anteriormente.</p>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

import Form from "@/components/formLicitacion"
import { newLicitacion} from "@/lib/actions"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

async function page() {
  const sesion = await auth();
  if (!sesion) redirect('/')
  return (
    <div>
        <h3 className="text-4xl text-center mb-3">Nueva licitación</h3>
        <Form action={newLicitacion} title='Crear licitación' onClick="Licitación creada con éxito" articulo={null} usuario={sesion?.user?.name}/>
        <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer mb-4 text-center w-[150px]">
          <Link href="/adjudicadas">
              Volver atrás
          </Link>
        </div>
    </div>
  )
}

export default page


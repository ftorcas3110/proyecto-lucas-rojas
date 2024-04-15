import Form from "@/components/formLicitacion"
import { newLicitacion} from "@/lib/actions"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function page() {
  const sesion = await auth();
  if (!sesion) redirect('/')
  return (
    <div>
        <h3 className="text-4xl text-center mb-3">Nueva licitación</h3>
        <Form action={newLicitacion} title='Crear licitación' onClick="Licitación creada con éxito" articulo={null}  />
    </div>
  )
}

export default page
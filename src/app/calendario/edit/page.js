import { prisma } from '@/lib/prisma'
import { editEvento } from "@/lib/actions"
import { eliminarEvento } from "@/lib/actions"
import FormCalendario from "@/components/formCalendario"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic'

async function page({searchParams}) {

  const sesion = await auth();
  if (!sesion) redirect('/')
  
  const evento = await prisma.evento.findUnique({
    where: {
      id: Number(searchParams.id),
    },
  })

  return (
    <div>
        <h3 className="text-4xl text-center mb-3">Editar evento {evento.title}</h3>
        <FormCalendario action={editEvento} title='Editar evento' onClick='Evento editado' evento={evento} edicion={true} />
        <FormCalendario action={eliminarEvento} title='Eliminar evento' onClick='Evento eliminado' evento={evento} edicion={true} eliminar={true} />
    </div>
  )
}


export default page
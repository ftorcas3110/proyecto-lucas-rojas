import { prisma } from '@/lib/prisma'
import { editEvento } from "@/lib/actions"
import { eliminarEvento } from "@/lib/actions"
import FormCalendario from "@/components/formCalendario"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic'
import Link from 'next/link';

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
        <h3 className="text-4xl text-center mb-3 mt-[150px]">Editar evento {evento.title}</h3>
        <FormCalendario action={editEvento} title='Editar evento' onClick='Evento editado' evento={evento} edicion={true} />
        <FormCalendario action={eliminarEvento} title='Eliminar evento' onClick='Evento eliminado' evento={evento} edicion={true} eliminar={true} />
        <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer mb-4 text-center w-[150px]">
          <Link href="/calendario">
              Volver atrás
          </Link>
        </div>
    </div>
  )
}


export default page
import Form from "@/components/formLicitacion"
import { prisma } from '@/lib/prisma'
import { editLicitacion } from "@/lib/actions"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

async function page({searchParams}) {

  const sesion = await auth();
  if (!sesion) redirect('/')
  
  const licitacion = await prisma.licitacion.findUnique({
    where: {
      item: Number(searchParams.item),
    },
  })

  return (
    <div>
        <h3 className="text-4xl text-center mb-3">Editar licitación {licitacion.numexpediente}</h3>
        <Form action={editLicitacion} title='Editar licitación' onClick='Licitación editada' licitacion={licitacion} edicion={true}  />
    </div>
  )
}


export default page
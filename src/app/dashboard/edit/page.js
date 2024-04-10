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
        <h3>Editar licitación {searchParams.numexpediente}</h3>
        <Form action={editLicitacion} title='Editar licitación' licitacion={licitacion}  />
    </div>
  )
}


export default page
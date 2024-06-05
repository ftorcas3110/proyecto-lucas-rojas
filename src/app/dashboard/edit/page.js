import Form from "@/components/formLicitacion"
import { prisma } from '@/lib/prisma'
import { editLicitacion } from "@/lib/actions"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

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
        {console.log(licitacion.id)}
        <Form action={editLicitacion} title='Editar licitación' onClick='Licitación editada' licitacion={licitacion} edicion={true}  />
        <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer mb-4 text-center w-[150px]">
          <Link href="/dashboard">
              Volver atrás
          </Link>
        </div>
    </div>
  )
}


export default page
import Form from "@/components/ficha"
import { prisma } from '@/lib/prisma'
import { deleteLicitacion } from "@/lib/actions"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

async function page({ searchParams }) {
  const sesion = await auth();
  if (!sesion) redirect('/')
  const licitacion = await prisma.licitacion.findUnique({
    where: {
      item: Number(searchParams.item),
    },
  })

  return (
    <div>
      <h3 className="text-4xl text-center mb-3">Licitación {licitacion.numexpediente}</h3>
      <Form action={deleteLicitacion} title='Eliminar licitación' licitacion={licitacion} onClick='Licitación eliminada con éxito' disabled={true} />
      <button href="adjudicadas/">Volver atrás</button>
    </div>
  )
}

export default page
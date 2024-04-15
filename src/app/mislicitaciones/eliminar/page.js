import Form from "@/components/formLicitacion"
import { prisma } from '@/lib/prisma'
import { deleteMiLicitacion } from "@/lib/actions"
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
      <h3 className="text-4xl text-center mb-3">¿Eliminar de mis licitaciones {licitacion.numexpediente}?</h3>
      <Form action={deleteMiLicitacion} title='Eliminar licitación' licitacion={licitacion} onClick='Licitación eliminada de mis licitaciones' disabled={true} />
    </div>
  )
}

export default page
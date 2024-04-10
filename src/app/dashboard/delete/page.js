import Form from "@/components/formLicitacion"
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
      <h3>Eliminar licitación {searchParams.item}</h3>
      <Form action={deleteLicitacion} title='Eliminar licitación' licitacion={licitacion} disabled={true} />
    </div>
  )
}

export default page
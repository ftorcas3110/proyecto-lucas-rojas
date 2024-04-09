import Form from "@/components/Form"
import prisma from '@/lib/prisma'
import { deleteArticulo } from "@/lib/actions"

export const dynamic = 'force-dynamic'

async function page({ searchParams }) {
  const articulo = await prisma.articulo.findUnique({
    where: {
      id: Number(searchParams.id),
    },
  })

  return (
    <div>
      <h3>Eliminar artículo {searchParams.id}</h3>
      <Form action={deleteArticulo} title='Eliminar artículo' articulo={articulo} disabled={true} />
    </div>
  )
}

export default page
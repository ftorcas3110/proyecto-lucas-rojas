import Form from "@/components/Form"
import prisma from '@/lib/prisma'
import { editArticulo } from "@/lib/actions"

export const dynamic = 'force-dynamic'

async function page({searchParams}) {
  const articulo = await prisma.articulo.findUnique({
    where: {
      id: Number(searchParams.id),
    },
  })

  return (
    <div>
        <h3>Editar artículo {searchParams.id}</h3>
        <Form action={editArticulo} title='Editar artículo' articulo={articulo}  />
    </div>
  )
}


export default page
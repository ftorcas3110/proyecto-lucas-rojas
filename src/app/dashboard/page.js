import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from 'next/link'
import Licitacion from '@/components/Licitacion'
import { getLicitaciones } from '@/lib/actions'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const licitaciones = await getLicitaciones()
  const sesion = await auth();
  if (!sesion) redirect('/')
  //console.log(licitaciones);

  return (
    <>
    <div>
    </div>
      <div>
          <Link className='enlace' href="/dashboard/new"> Nueva licitación </Link>
          {
              licitaciones.map((licitacion) => (
                  <Licitacion key={licitacion.item} licitacion={licitacion} >
                      <Link
                          className='enlace'
                          href={{ pathname: '/dashboard/edit', query: { item: licitacion.item } }}>
                          Editar licitación
                      </Link>
                      <Link
                          className='enlace'
                          href={{ pathname: '/dashboard/delete', query: { item: licitacion.item } }}>
                          Eliminar licitación
                      </Link>
                  </Licitacion>
              ))
          }
      </div>
      </>
  )
}

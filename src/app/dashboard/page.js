import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from 'next/link'
import Licitacion from '@/components/Licitacion'
import { getLicitaciones } from '@/lib/actions'
import Buscador from "@/components/buscador";

export const dynamic = 'force-dynamic'

export default async function Home() {
    const licitaciones = await getLicitaciones()
    const sesion = await auth();
    if (!sesion) redirect('/')
    //console.log(licitaciones);

    return (
        <>
        <Buscador/>
            <div className="mx-auto">
            <p className="text-3xl">Todas las licitaciones</p>

                {
                    licitaciones.map((licitacion) => (
                        <Licitacion key={licitacion.item} licitacion={licitacion}>
                            <div className="grid grid-cols-1 w-[200px] justify-center align-middle text-center px-[10px]">
                                <Link
                                    className='enlace col-span-2 flex justify-center align-middle text-center items-center h-full pt-[12.5%] mb-2'
                                    href={{ pathname: '/dashboard/edit', query: { item: licitacion.item } }}>
                                    Editar licitación
                                </Link>
                                <Link
                                    className='enlace col-span-2 flex justify-center align-middle text-center items-center h-full pt-[12.5%] mt-2'
                                    href={{ pathname: '/dashboard/delete', query: { item: licitacion.item } }}>
                                    Eliminar licitación
                                </Link>
                            </div>
                        </Licitacion>
                    ))
                }
            </div>
        </>
    )
}

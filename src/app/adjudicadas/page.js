import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from 'next/link'
import Licitacion from '@/components/Licitacion'
import { getLicitacionesAsignadas } from '@/lib/actions'

export const dynamic = 'force-dynamic'


export default async function Home() {
    const licitaciones = await getLicitacionesAsignadas()
    const sesion = await auth();
    if (!sesion) redirect('/')

    return (
        <>
            <div className="w-[80%] mx-auto">

                {
                    licitaciones.map((licitacion) => (
                        <>
                            <Licitacion key={licitacion.item} licitacion={licitacion}>
                                <div className="grid grid-cols-1 w-[200px] justify-center align-middle text-center px-[10px]">
                                    <Link
                                        className='enlace col-span-2 flex justify-center align-middle text-center items-center h-full pt-[15%] mb-2'
                                        href={{ pathname: '/dashboard/edit', query: { item: licitacion.item } }}>
                                        Editar licitación
                                    </Link>
                                    <Link
                                        className='enlace col-span-2 flex justify-center align-middle text-center items-center h-full pt-[15%] mt-2'
                                        href={{ pathname: '/dashboard/delete', query: { item: licitacion.item } }}>
                                        Eliminar licitación
                                    </Link>
                                </div>
                            </Licitacion>
                        </>
                    ))
                }
            </div>
        </>
    )
}
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
            <div className="mx-auto">

                {
                    licitaciones.map((licitacion) => (
                        <Licitacion key={licitacion.item} licitacion={licitacion}>
                            <div className="grid grid-cols-1 w-[200px] justify-center align-middle text-center px-[10px]">
                            <div className="h-[40%] mx-auto">
                                    <Link
                                        className='enlace flex justify-center align-middle text-center items-center h-full mb-2 w-full bg-gray-300 py-2 rounded-lg'
                                        href={{ pathname: '/dashboard/edit', query: { item: licitacion.item } }}>
                                        Editar licitación
                                    </Link>
                                    <Link
                                        className='enlace flex justify-center align-middle text-center items-center h-full mt-2 w-full bg-gray-300 py-2 rounded-lg'
                                        href={{ pathname: '/dashboard/delete', query: { item: licitacion.item } }}>
                                        Eliminar licitación
                                    </Link>
                                </div>
                            </div>
                        </Licitacion>
                    ))
                }
            </div>
        </>
    )
}

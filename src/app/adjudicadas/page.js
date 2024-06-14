import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from 'next/link'
import Licitacion from '@/components/LicitacionAsignadas'
import { getLicitacionesAsignadas } from '@/lib/actions'
import Buscador from "@/components/buscadorAdjudicadas"

export const dynamic = 'force-dynamic'


export default async function Home() {
    const licitaciones = await getLicitacionesAsignadas()
    const sesion = await auth();
    if (!sesion) redirect('/')
    return (
        <>
        <h1 className="text-4xl font-bold text-gray-900 text-center mt-[150px] mb-8">Licitaciones Adjudicadas</h1>
            <Buscador/>
            <br/>
                {
                    licitaciones.map((licitacion) => (
                        <>
                            <Licitacion key={licitacion.item} licitacion={licitacion}>
                                <div className="border border-gray-400 rounded bg-gray-100 cursor-pointer transition duration-500 hover:bg-green-400 w-24 h-12 flex items-center justify-center my-2">
                                    <Link
                                        className='flex align-right items-right text-center justify-right w-full pl-[10px]'
                                        href={{ pathname: '/adjudicadas/ficha', query: { item: licitacion.item } }}>
                                        Abrir ficha
                                    </Link>
                                </div>
                            </Licitacion>
                        </>
                    ))
                }
        </>
    )
}

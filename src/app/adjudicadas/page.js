import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from 'next/link'
import Licitacion from '@/components/LicitacionAsignadas'
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
                                <div className="border border-black items-center text-center align-middle rounded bg-gray-300 cursor-pointer transition duration-500 hover:bg-green-500 w-[100px] h-[50px] flex">
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
            </div>
        </>
    )
}

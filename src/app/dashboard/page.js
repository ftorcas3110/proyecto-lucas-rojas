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
        <h1 className="text-4xl font-bold text-gray-900 text-center mt-[150px] mb-8">Licitaciones Lucas Rojas</h1>
            <div className="mx-auto">

                {
                    licitaciones.map((licitacion) => (
                        <Licitacion key={licitacion.item} licitacion={licitacion}>
                                <div className="h-[40%] mx-auto">
                                <div className="border border-black items-center text-center align-middle rounded bg-gray-300 cursor-pointer transition duration-500 hover:bg-blue-500 w-[100px] h-[50px] flex my-6">
                                    <Link
                                        className='flex align-middle items-center text-center justify-center w-full pl-[10px]'
                                        href={{ pathname: '/dashboard/edit', query: { item: licitacion.item } }}>
                                        Editar licitación
                                    </Link>
                                    </div>
                                    <div className="border border-black items-center text-center align-middle rounded bg-gray-300 cursor-pointer transition duration-500 hover:bg-red-500 w-[100px] h-[50px] flex">
                                    <Link
                                        className='flex align-middle items-center text-center justify-center w-full pl-[10px]'                                       
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

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
<div className="mx-auto w-[200px] px-6 grid grid-cols-1 justify-center">
    <div className="font-bold mb-2 mx-auto text-center">
        <h3>Acciones</h3>
    </div>
    <div className="border border-gray-400 rounded bg-gray-100 cursor-pointer transition duration-500 hover:bg-blue-400 w-24 h-12 flex items-center justify-center my-2">
        <Link
            className="w-full h-full flex items-center justify-center text-center"
            href={{ pathname: '/dashboard/edit', query: { item: licitacion.item } }}>
            Editar licitación
        </Link>
    </div>
    <div className="border border-gray-400 rounded bg-gray-100 cursor-pointer transition duration-500 hover:bg-red-400 w-24 h-12 flex items-center justify-center my-2">
        <Link
            className="w-full h-full flex items-center justify-center text-center"
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

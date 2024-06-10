"use client"
import FormCalendario from "@/components/formCalendario"
import { newEvento } from "@/lib/actions"
import { useSearchParams } from 'next/navigation'
import Link from "next/link"

function page() {

  const searchParams = useSearchParams()
 
  const date = searchParams.get('date')
  const usuario = searchParams.get('usuario')

  console.log(date);
  return (
    <div>
        <h3 className="text-4xl text-center mb-3 mt-[150px]">Nuevo evento</h3>
        <FormCalendario action={newEvento} title='Crear evento' onClick="Evento creado con éxito" articulo={null} fecha={date} usuario={usuario}/>
        <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer mb-4 text-center w-[150px]">
          <Link href="/calendario">
              Volver atrás
          </Link>
        </div>
    </div>
  )
}

export default page
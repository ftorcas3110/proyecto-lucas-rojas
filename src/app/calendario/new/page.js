"use client"
import FormCalendario from "@/components/formCalendario"
import { newEvento } from "@/lib/actions"
import { useSearchParams } from 'next/navigation'

function page() {

  const searchParams = useSearchParams()
 
  const date = searchParams.get('date')
  const usuario = searchParams.get('usuario')

  console.log(date);
  return (
    <div>
        <h3 className="text-4xl text-center mb-3">Nuevo evento</h3>
        <FormCalendario action={newEvento} title='Crear evento' onClick="Evento creado con éxito" articulo={null} fecha={date} usuario={usuario}/>
    </div>
  )
}

export default page
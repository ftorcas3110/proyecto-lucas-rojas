"use client"
import Link from "next/link"
import { useEffect } from 'react';

function Licitacion({ children, licitacion }) {

    function estadoInicialLicitacion({ licitacion }) {
        switch (licitacion.estadoini) {
            case "PRESENTADA":
                return (<span className="rounded-xl bg-[#83f28f] text-black border-2 p-1">{licitacion.estadoini}</span>)

            case "DESESTIMADA":
                return (<span className="rounded-xl bg-[#d3d3d3] text-black border-2 p-1">{licitacion.estadoini}</span>)


            case "EN ESTUDIO":
                return (<span className="rounded-xl bg-[#ADD8E6] text-black border-2 p-1">{licitacion.estadoini}</span>)


            case "ANULADA":
                return (<span className="rounded-xl bg-[#ff474c] text-white border-2 p-1">{licitacion.estadoini}</span>)

            default:
                return null; // Añadido para manejar el caso por defecto
        }
    }

    function estadoFinalLicitacion({ licitacion }) {
        switch (licitacion.estadofinal) {
            case "ADJUDICADA":
                return (<span className="rounded-xl bg-[#83f28f] text-black border-2 p-1">{licitacion.estadofinal}</span>)

            case "ANULADA":
                return (<span className="rounded-xl bg-[#ff474c] text-white border-2 p-1">{licitacion.estadofinal}</span>)

            case "DESESTIMADA":
                return (<span className="rounded-xl bg-[#d3d3d3] text-black border-2 p-1">{licitacion.estadofinal}</span>)

            case "DESIERTA":
                return (<span className="rounded-xl bg-[#cab53f] text-black border-2 p-1">{licitacion.estadofinal}</span>)

            case "EN ESPERA RESOLUCIÓN":
                return (<span className="rounded-xl bg-[#ADD8E6] text-black border-2 p-1">{licitacion.estadofinal}</span>)

            case "NO ADJUDICADA":
                return (<span className="rounded-xl bg-[#ff474c] text-white border-2 p-1">{licitacion.estadofinal}</span>)

            default:
                return null; // Añadido para manejar el caso por defecto
        }
    }

    const diaformalizacion = licitacion?.fechaformalizacion?.getDate()
    const mesformalizacion = licitacion?.fechaformalizacion?.getMonth() + 1
    const anyoformalizacion = licitacion?.fechaformalizacion?.getFullYear()
    const horaformalizacion = (licitacion?.fechaformalizacion?.getHours() < 10 ? '0' : '') + licitacion?.fechaformalizacion?.getHours()
    const minutoformalizacion = (licitacion?.fechaformalizacion?.getMinutes() < 10 ? '0' : '') + licitacion?.fechaformalizacion?.getMinutes()

    const diafinalizacion = licitacion?.fechafincontrato?.getDate()
    const mesfinalizacion = licitacion?.fechafincontrato?.getMonth() + 1
    const anyofinalizacion = licitacion?.fechafincontrato?.getFullYear()
    const horafinalizacion = (licitacion?.fechafincontrato?.getHours() < 10 ? '0' : '') + licitacion?.fechafincontrato?.getHours()
    const minutofinalizacion = (licitacion?.fechafincontrato?.getMinutes() < 10 ? '0' : '') + licitacion?.fechafincontrato?.getMinutes()

    const rutacarpeta = "file:///" + licitacion.rutacarpeta

    return (
<div className="grid grid-cols-1 gap-4">
    <div className="col-span-1">
        <div style={{ 'border': '1px solid black', 'padding': '20px' }} className="mb-4 rounded-xl flex text-black text-left w-[100%] content-center items-center justify-between">
            <div className="w-64 flex items-left justify-left">
                <p><strong>Cliente:</strong> {licitacion.cliente}</p>
            </div>
            <div className="w-64 pl-8 flex items-center justify-center">
                <p><strong>Número expediente:</strong> {licitacion.numexpediente}</p>
            </div>
            <div className="w-64 pl-8 flex items-center justify-center">
                <p>Responsable: {licitacion?.responsable == null || licitacion?.responsable == '' ? (<span>No disponible</span>):(<strong>{licitacion.responsable}</strong>)}</p>
            </div>
            <div className="w-64 pl-8 flex items-center justify-center">
                {licitacion.fechaformalizacion == null ? (
                    <p>Duración no disponible</p>
                ) : (
                    <p>Duración de contrato: <br />{diaformalizacion}/{mesformalizacion}/{anyoformalizacion} - {horaformalizacion}:{minutoformalizacion}h // {diafinalizacion}/{mesfinalizacion}/{anyofinalizacion} - {horafinalizacion}:{minutofinalizacion}h</p>
                )}
            </div>
            <div className="w-32 pl-8 flex align-right items-right text-center justify-right">
                {licitacion.rutacarpeta == null ? (
                    <div className="border border-black rounded bg-gray-300 cursor-pointer transition duration-500 hover:bg-red-500 w-[100px] h-[80px] flex">
                        Ruta de carpeta no disponible
                    </div>
                ) : (
                    <Link href={rutacarpeta} target="_blank" className="flex align-right items-right text-center justify-right">
                        <div className="border border-black rounded bg-gray-300 cursor-pointer transition duration-500 hover:bg-blue-500 w-[100px] h-[50px] flex">
                            Abrir carpeta
                        </div>
                    </Link>
                )}
            </div>
            {children}
        </div>
    </div>
</div>


    )
}

export default Licitacion;

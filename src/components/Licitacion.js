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

            case "DESESTIMADA":
                return (<span className="rounded-xl bg-[#d3d3d3] text-black border-2 p-1">{licitacion.estadofinal}</span>)
               

            case "EN ESPERA RESOLUCIÓN":
                return (<span className="rounded-xl bg-[#ADD8E6] text-black border-2 p-1">{licitacion.estadofinal}</span>)
               

            case "NO ADJUDICADA":
                return (<span className="rounded-xl bg-[#ff474c] text-white border-2 p-1">{licitacion.estadofinal}</span>)
               
            default:
                return null; // Añadido para manejar el caso por defecto
        }
    }

    

    useEffect(() => {
        // Verificación de navegador
        const isChrome = navigator.userAgent.indexOf("Chrome") !== -1;

        // Función para cambiar el enlace después de medio segundo
        const cambiarEnlaces = () => {
            if (isChrome){
            // Obtener todos los enlaces que contienen "LocalExplorer:"
            const localExplorerLinks = document.querySelectorAll('a[href^="LocalExplorer:"]');

                // Iterar sobre los enlaces y cambiar el href
                localExplorerLinks.forEach(link => {
                    // Obtener el valor actual del href
                    const currentHref = link.getAttribute('href');
                    // Reemplazar "LocalExplorer:" por "file:///"
                    const newHref = currentHref.replace("LocalExplorer:", "file:///");
                    // Establecer el nuevo valor del href después de medio segundo
                    setTimeout(() => {
                        link.setAttribute('href', newHref);
                    }, 1000);
                });
            }
        };

        // Ejecutar la función después de medio segundo
        setTimeout(cambiarEnlaces, 1000);
    }, []); // Ejecutar una vez después del montaje del componente

    const dia = licitacion.fechapresentacion.getDate()
    const mes = licitacion.fechapresentacion.getMonth()+1
    const anyo = licitacion.fechapresentacion.getFullYear()
    const hora = (licitacion.fechapresentacion.getHours() < 10 ? '0' : '') + licitacion.fechapresentacion.getHours() 
    const minuto = (licitacion.fechapresentacion.getMinutes() < 10 ? '0' : '') + licitacion.fechapresentacion.getMinutes() 

    const rutacarpeta = "file:///"+ licitacion.rutacarpeta

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="col-span-4">
                <div style={{ 'border': '1px solid black', 'padding': '20px' }} className="mb-4 rounded-xl flex text-black text-left w-[100%]">
                    <div className="w-1/3 pr-8">
                        <p><strong>Cliente: {licitacion.cliente}</strong></p>
                        <p><strong>Número expediente: {licitacion.numexpediente}</strong></p>
                        <p>Título: {licitacion.titulo}</p>
                        <p>Fecha de presentación: {dia}/{mes}/{anyo} - {hora}:{minuto}h</p>
                    </div>
                    <div className="w-1/3 pl-8">
                        <p>Tipo de Contrato: {licitacion.tipocontrato}</p>
                        <p>Tipo: {licitacion.tipo}</p>
                        <p>Importe: {licitacion.importe.toString()} €</p>
                    </div>
                    <div className="w-1/3 pl-8">
                        <p>Captada por: <strong>{licitacion.captadapor}</strong></p>
                        <p>Estudio por: <strong>{licitacion.estudiopor}</strong></p>
                        <p>Presupuesto por: <strong>{licitacion.presupuestopor}</strong></p>
                        <p>Presentada por: <strong>{licitacion.presentadapor}</strong></p>
                    </div>
                    <div className="w-1/3 pl-8 content-center">
                        <p>Estado inicial: {estadoInicialLicitacion({licitacion})}</p>
                        <p>Estado final: {estadoFinalLicitacion({licitacion})}</p>
                        {licitacion.rutacarpeta == null ? (                         
                            <div className="border border-black rounded bg-red-300">
                                Ruta de carpeta no disponible
                            </div>
                        ) : (
                            <Link href={rutacarpeta} target="_blank">
                                <div className="border border-black rounded cursor-pointer bg-green-300">
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

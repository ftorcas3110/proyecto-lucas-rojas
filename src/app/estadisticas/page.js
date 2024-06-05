"use client"
import { useState } from 'react';
import GraficoPresupuesto from "@/components/GraficoPresupuesto";
import GraficoPresentadas from "@/components/GraficoPresentadas";
import GraficoImportes from "@/components/GraficoImportes";
import GraficoCircularPresupuesto from "@/components/GraficoCircularPresupuesto";
import GraficoCircularPresentadas from "@/components/GraficoCircularPresentadas";
import GraficoCircularImportes from "@/components/GraficoCircularImportes";
import GraficoPresupuestoTabla from "@/components/GraficoPresupuestoTabla";

function page() {

  const [valor, setValor] = useState(9); // Estado para controlar el valor a enviar al componente

  const handlePresupuestoClick = () => {
    setValor(9); // Establecer el valor como 9 (Presupuesto X)
  };

  const handlePresentadaClick = () => {
    setValor(10); // Establecer el valor como 10 (Presentada X)
  };

  return (
    <div className="flex flex-col items-center sm:h-[90vh] py-5 md:h-[90vh] mt-auto p-5 w-[80%] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-4 md:gap-8 w-full">

        <div className="col-span-2">
          <div className="text-center container items-center border-2 border-black relative p-2 rounded-lg shadow-lg text-black mt-4 w-[100%] mx-auto h-auto pb-5 mb-[4vh]">
            <div className="h-full w-[98%] mx-auto">
              <div className="col-span-2 flex justify-left">
                <button
                  onClick={() => handlePresupuestoClick(9)}
                  className="w-[140px] h-[32px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mx-2"
                >
                  Presupuesto X
                </button>
                <button
                  onClick={() => handlePresentadaClick(10)}
                  className="w-[140px] h-[32px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mx-2"
                >
                  Presentada X
                </button>

              </div>
              <GraficoPresupuestoTabla valor={valor} />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="text-center container items-center border-2 border-black relative p-2 rounded-lg shadow-lg text-black mt-4 w-[80%] mx-auto h-[900px]">
            <div className="h-full w-[80%] mx-auto overflow-hidden">
              <GraficoPresupuesto />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="text-center container items-center border-2 border-black relative p-2 rounded-lg shadow-lg text-black mt-4 w-[80%] mx-auto h-[900px]">
            <div className="h-full w-[80%] mx-auto">
              <GraficoCircularPresupuesto />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="text-center container items-center border-2 border-black relative p-2 rounded-lg shadow-lg text-black mt-4 w-[80%] mx-auto h-[900px]">
            <div className="h-full w-[80%] mx-auto">
              <GraficoPresentadas />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="text-center container items-center border-2 border-black relative p-2 rounded-lg shadow-lg text-black mt-4 w-[80%] mx-auto h-[900px]">
            <div className="h-full w-[80%] mx-auto">
              <GraficoCircularPresentadas />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="text-center container items-center border-2 border-black relative p-2 rounded-lg shadow-lg text-black mt-4 w-[80%] mx-auto h-[900px]">
            <div className="h-full w-[80%] mx-auto">
              <GraficoImportes />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="text-center container items-center border-2 border-black relative p-2 rounded-lg shadow-lg text-black mt-4 w-[80%] mx-auto h-[900px]">
            <div className="h-full w-[80%] mx-auto">
              <GraficoCircularImportes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

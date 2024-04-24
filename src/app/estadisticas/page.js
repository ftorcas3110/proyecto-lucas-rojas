import GraficoPresupuesto from "@/components/GraficoPresupuesto";
import GraficoPresentadas from "@/components/GraficoPresentadas";
import GraficoImportes from "@/components/GraficoImportes";
import GraficoCircularPresupuesto from "@/components/GraficoCircularPresupuesto";
import GraficoCircularPresentadas from "@/components/GraficoCircularPresentadas";
import GraficoCircularImportes from "@/components/GraficoCircularImportes";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function page() {
  const sesion = await auth();

  if (!sesion) redirect('/')

  return (
    <div className="flex flex-col items-center justify-center sm:h-[90vh] py-5 md:h-[90vh] mt-[48%] p-5 w-[80%] mx-auto mb-[60%]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 sm:gap-4 md:gap-10 w-full">

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

import GraficoPresupuesto from "@/components/GraficoPresupuesto";
import GraficoPresentadas from "@/components/GraficoPresentadas";
import GraficoImportes from "@/components/GraficoImportes";
import GraficoCircularPresupuesto from "@/components/GraficoCircularPresupuesto";
import GraficoCircularPresentadas from "@/components/GraficoCircularPresentadas";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


async function page() {
  const sesion = await auth();

  if (!sesion) redirect('/')

  return (
    <div className="flex flex-col items-center justify-center sm:h-[90vh] py-5 md:h-[90vh] p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10 md:gap-10 w-full">
        <div className="col-span-1 h-full">
          <div className="text-center container items-center border-2 border-black relative p-8 rounded-lg shadow-lg text-black mt-4 h-full">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2"></div>
            <div className="h-full">
              <GraficoPresupuesto />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-full">
          <div className="text-center container items-center border-2 border-black relative p-8 rounded-lg shadow-lg text-black mt-4 h-full">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2"></div>
            <div className="h-full">
              <GraficoPresentadas />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-full">
          <div className="text-center container items-center border-2 border-black relative p-8 rounded-lg shadow-lg text-black mt-4 h-full">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2"></div>
            <div className="h-full">
              <GraficoImportes />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-full">
          <div className="text-center container items-center border-2 border-black relative p-8 rounded-lg shadow-lg text-black mt-4 h-full">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2"></div>
            <div className="h-full">
              {/* <GraficoCircularPresupuesto /> */}
            </div>
          </div>
        </div>
        <div className="col-span-1 h-full">
          <div className="text-center container items-center border-2 border-black relative p-8 rounded-lg shadow-lg text-black mt-4 h-full">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2"></div>
            <div className="h-full">
              {/* <GraficoCircularPresentadas /> */}
            </div>
          </div>
        </div>
        <div className="col-span-1 h-full">
          <div className="text-center container items-center border-2 border-black relative p-8 rounded-lg shadow-lg text-black mt-4 h-full">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2"></div>
            <div className="h-full">
              {/* Component 6 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;
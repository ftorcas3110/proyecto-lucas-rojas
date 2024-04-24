import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Buscador from "@/components/buscador";

export const dynamic = 'force-dynamic'

export default async function Home() {
    const sesion = await auth();
    if (!sesion) redirect('/')
    //console.log(licitaciones);

    return (
        <>
            <div className="mx-auto w-[80%]">
            <Buscador/>

            </div>
        </>
    )
}

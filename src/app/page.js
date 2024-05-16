import { LoginForm } from "@/components/login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const sesion = await auth();
  if (sesion) redirect('/mislicitaciones')
  return (
    <div className="flex flex-col items-center justify-center sm:h-[90vh] py-5 md:h-[90vh] p-5 font-Poppins">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:gap-10 md:gap-10">
        <p className="text-3xl">Licitaciones Lucas Rojas</p>
        <div className="text-center container items-center border-2 border-black relative p-8 rounded-lg shadow-lg text-black">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          </div>
          <h1 className=" text-[30px]">Inicia sesión</h1>          
          <LoginForm/>         
        </div>
      </div>
    </div>
    
  );
}

import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center sm:h-[90vh] py-5 md:h-[90vh] p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:gap-10 md:gap-10">

        <div className="text-center container items-center border-2 border-black relative p-8 rounded-lg shadow-lg text-black">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          </div>
          <h1 className=" text-[30px]">Inicia sesión</h1>
          <p>
            <LoginForm/>
          </p>
        </div>
      </div>
    </div>
    
  );
}

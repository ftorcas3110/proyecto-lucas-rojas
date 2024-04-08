import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function page() {
  const sesion = await auth();

  if (!sesion) redirect('/')

  return (
    <>
      <a href="file:///Z:\Licitaciones PC\2024">asd</a>
    </>
  );
}

export default page;
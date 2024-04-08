import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function page() {
  const sesion = await auth();

  if (!sesion) redirect('/')

  return (
    <>
    </>
  );
}

export default page;
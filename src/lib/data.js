import { prisma } from "@/lib/prisma";

export async function getUserByEmail( email ) {
  const user = await prisma.user.findUnique({
      where: { email }
    });
  //console.log(user);
  return user

}

export async function getUserById( id ){
  const user = await prisma.user.findUnique({
    where: { id }
  });
  //console.log(user);
  return user

}
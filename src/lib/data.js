export async function getUserById( id ) {
  const user = await prisma.user.findUnique({
      where: { id }
    });
  console.log(user);
  return user

}
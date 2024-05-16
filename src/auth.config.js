import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs";
//import { prisma } from "@/lib/prisma";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
      //   const user = await prisma.user.findUnique({
      //     where: {
      //       email: credentials.email,
      //     },
      //   });
      const user = await getUserByEmail(credentials.email)

        if (user) {
          // && user.emailVerified
          const matchPassword = bcrypt.compare(
            credentials.password,
            user?.password
          );
          if (matchPassword) return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

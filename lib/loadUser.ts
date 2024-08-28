import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const loadUser = async () => {
  const user = await currentUser();
  const authManager = auth();

  if (!user) return authManager.redirectToSignIn();

  const userData = await db.user.findFirst({ where: { id: user.id } });

  if (userData) return userData;

  const newUser = await db.user.create({
    data: {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imgURL: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};

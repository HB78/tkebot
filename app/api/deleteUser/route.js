import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const DELETE = async (req) => {
  // je vais utiliser sessionpour la sécurité du site plus tard
  const session = await getServerSession(authOptions);
  try {
    if (!session || !session?.user) {
      return new NextResponse("vous n'êtes pas connecté", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });

    if (session?.user?.id !== user.id) {
      return new NextResponse("vous n'avez pas les droits", { status: 403 });
    }

    if (!user) {
      return new NextResponse("cet utilisateur n'existe pas", {
        status: 404,
      });
    }

    const userUpdated = await prisma.user.delete({
      where: { id: user.id },
    });

    return NextResponse.json("utilisateur supprimé avec succès", {
      status: 200,
    });
  } catch (error) {
    console.log("error:", error);
    return new NextResponse(
      "erreur du serveur dans la fonction update user route",
      {
        status: 500,
      }
    );
  }
};

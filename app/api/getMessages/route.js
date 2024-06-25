import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const POST = async (req) => {
  // je vais utiliser sessionpour la sécurité du site plus tard
  const session = await getServerSession(authOptions);
  try {
    // if (!session || !session?.user) {
    //   return new NextResponse("vous n'êtes pas connecté", { status: 401 });
    // }

    const body = await req.json();
    const { chatId } = body;

    const messages = await prisma.message.findMany({
      where: {
        chatId: chatId,
      },
    });
    if (!messages) {
      return new NextResponse("vous n'avez pas encore de conversations", {
        status: 200,
      });
    }

    const stringifyFindMessages = JSON.stringify(messages);

    return new NextResponse(stringifyFindMessages, {
      status: 200,
    });
  } catch (error) {
    console.log("error:", error);
    return new NextResponse("erreur du serveur dans la fonction create-chat", {
      status: 500,
    });
  }
};

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const GET = async () => {
  const session = await getServerSession(authOptions);
  try {
    // if (!session || !session?.user) {
    //   return new NextResponse("vous n'êtes pas connecté", { status: 401 });
    // }

    const findChat = await prisma.user.findFirst({
      where: { id: session?.user?.id },
      include: { chatsOwned: true },
    });

    // if (!findChat || !findChat.chatsOwned || findChat.chatsOwned.length === 0) {
    //   return new NextResponse("vous n'avez pas de chat", { status: 404 });
    // }

    // Modifier la propriété pdfUrl de chaque élément de l'array chatsOwned
    // findChat.chatsOwned.forEach((chat) => {
    //   chat.pdfUrl = chat.pdfUrl.split("/").pop().replace(".pdf", "");
    // });

    const stringifyFindChat = JSON.stringify(findChat);

    return new NextResponse(stringifyFindChat, {
      status: 200,
    });
  } catch (error) {
    console.log("error:", error);
    return new NextResponse("erreur du serveur dans la fonction create-chat", {
      status: 500,
    });
  }
};

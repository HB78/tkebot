import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "./../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
      return new NextResponse("vous n'êtes pas connecté", { status: 401 });
    }

    const body = await req.json();
    const { pdfName, fileKey } = body;

    console.log("start load s3 into pinecone");
    await loadS3IntoPinecone(fileKey);
    console.log("end load s3 into pinecone");

    const createChat = await prisma.chat.create({
      data: {
        fileKey: fileKey,
        pdfName: pdfName,
        pdfUrl: getS3Url(fileKey),
        userId: session.user.id,
      },
    });
    //je cree un objet que je vais envoyer en reponse car j'ai besoin de l'id du chat pour faire la redirection mais aussi de l'url du pdf

    // const cleanPdfUrl = createChat.pdfUrl.split("/").pop().replace(".pdf", "");

    // const chatData = {
    //   id: createChat.id,
    //   pdfName: createChat.pdfName,
    //   pdfUrl: cleanPdfUrl,
    // };
    console.log("createChat:from route api create-chat", createChat);

    const chatId = JSON.stringify(createChat);

    return new NextResponse(chatId, {
      status: 201,
      message: "chat crée avec succes",
    });
  } catch (error) {
    console.log("error:", error);
    return new NextResponse("erreur du serveur dans la fonction create-chat", {
      status: 500,
    });
  }
};

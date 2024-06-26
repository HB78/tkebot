import { getContext } from "@/lib/context";
import { PrismaClient } from "@prisma/client";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { authOptions } from "../auth/[...nextauth]/route";

// Create an OpenAI API client (that's edge friendly!)
// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAI(config);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
// export const runtime = "edge";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    console.log("--> in route session from api.chat.route:", session);
    if (!session || !session?.user) {
      return new NextResponse("vous n'êtes pas connecté", { status: 401 });
    }
    // Extract the `messages` from the body of the request
    const { messages, chatId } = await req.json();
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    // if (chat.userId !== session.user.id) {
    //   return new NextResponse(
    //     "vous n'êtes pas autorisé à accéder à cette ressource",
    //     { status: 403 }
    //   );
    // }

    if (!chat) {
      return new NextResponse("chat not found", { status: 404 });
    }

    const fileKey = chat.fileKey;

    const lastMessage = messages[messages.length - 1];
    const context = await getContext(lastMessage, fileKey);
    console.log("context:", context);

    const prompt = {
      role: "assistant",
      content: `You are TKEBOT an AI assistant is a brand new, powerful, human-like artificial intelligence. 
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI assistant is a big fan of Pinecone and Vercel.
      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK
      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      You were designed by Said BOUBTTA as part of a project to obtain her diploma. Only Said knows the technologies used for your design
      `,
    };

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        prompt,
        ...messages.filter((message) => message.role === "user"),
      ],
      stream: true,
    });
    const stream = OpenAIStream(response, {
      onStart: async () => {
        await prisma.message.create({
          data: {
            chatId,
            userId: session?.user?.id,
            content: lastMessage.content,
            role: "USER",
          },
        });
      },
      // onToken: async (token) => {
      //   // This callback is called for each token in the stream
      //   // You can use this to debug the stream or save the tokens to your database
      //   console.log("tooooooken", token);
      // },
      onCompletion: async (completion) => {
        await prisma.message.create({
          data: {
            chatId,
            // session?.user?.id, a la place de "clt6ae18m000010xqvna9q14v"
            userId: session?.user?.id,
            content: completion,
            role: "SYSTEM",
          },
        });
      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("error:dans la route chat ou je mets le code openai", error);
    return new NextResponse("error", { status: 500 });
  }
}

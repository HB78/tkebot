import FileUpload from "@/components/FileUpload";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import { PrismaClient } from "@prisma/client";
import { ArrowRight, LogIn } from "lucide-react";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import { authOptions } from "./../api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("session:", session);

  if (!session?.user || !session?.user?.id) {
    redirect("/login");
  }

  const findChatFounded = await prisma.chat.findMany({
    where: { userId: session?.user?.id },
  });
  console.log("findChatFounded:FIRST", findChatFounded);

  let firstChat;

  if (findChatFounded && findChatFounded.length > 0) {
    firstChat = findChatFounded[0];
    console.log("firstChat:FOUNDED", firstChat);
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <Toaster />
      <Header name={session?.user?.username} />
      <div className="">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-2xl w-full font-semibold">
              Chat with any PDF
            </h1>
          </div>

          <div className="flex mt-2">
            {session?.user && firstChat ? (
              <Link href={`/chat/${firstChat.id}`}>
                <Button>
                  Go to Chats <ArrowRight className="ml-2" />
                </Button>
              </Link>
            ) : null}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Bienvenue sur TKEBOT, une application qui vous permet
            d&apos;interagir avec vos fichiers PDF instantanément. Une solution
            TKELEVATOR pour vous aider à gérer vos fichiers PDF.
          </p>

          <div className="w-[50%] mt-4">
            {session ? (
              <FileUpload />
            ) : (
              <Link href="/login">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

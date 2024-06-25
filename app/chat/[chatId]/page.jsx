import ComponentsOfChats from "@/components/ComponentsOfChats/ComponentsOfChats";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./../../api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

const Home = async ({ params }) => {
  const id = params.chatId;
  const session = await getServerSession(authOptions);

  if (!session?.user || !session?.user?.id) {
    redirect("/login");
  }

  // let chats = await fetchChats();

  let chats = await prisma.chat.findMany({
    where: { userId: session?.user?.id },
  });

  const currentChat = chats.find((chat) => chat.id === id);

  // faire une redirection si l'id n'es pas celui dans la const chats

  if (!chats) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen overflow-scroll scrollbar-hide">
      <ComponentsOfChats
        chats={chats}
        id={id}
        currentChatPDF={currentChat?.pdfUrl}
      />
    </main>
  );
};

export default Home;

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, MessageCircle, PlusCircle } from "lucide-react";
import Link from "next/link";

const ChatSideBar = ({ chats, chatId, visible, setVisible }) => {
  //create a function to toggle the sidebar
  const toggleSidebar = () => {
    setVisible(!visible);
  };

  //Pour couper le texte quand il est trop grand
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <section className="w-full h-auto overflow-scroll overflow-y-hidden scrollbar-hide soff p-4 text-gray-200 bg-gray-900 lg:min-h-screen">
      <Link href="/tkebot">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>
      <Button className="w-full mt-3" onClick={() => toggleSidebar()}>
        {visible ? (
          <EyeOff className="mr-2 w-4 h-4" />
        ) : (
          <Eye className="mr-2 w-4 h-4" />
        )}
        {visible ? "Masquer le fichier" : "Voir le fichier"}
      </Button>

      <div className="flex max-h-[3rem] overflow-x-scroll scrollbar-hide pb-20 flex-row gap-2 mt-4 lg:flex-col lg:max-h-screen">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-600 text-white rounded-full": chat.id === chatId,
                "hover:text-white": chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {" "}
                {truncateString(chat.pdfName, 15)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ChatSideBar;

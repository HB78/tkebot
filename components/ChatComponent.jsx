"use client";
import { fetchMessages } from "@/fetches/fetches";
import { useQuery } from "@tanstack/react-query";
import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { useEffect } from "react";
import MessageList from "./MessageList";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const ChatComponent = ({ chatId }) => {
  const { data, isPending } = useQuery({
    queryKey: ["messagesOfChat", chatId],
    queryFn: () => fetchMessages(chatId),
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  useEffect(() => {
    console.log("messages:", messages);
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (isPending) {
    return (
      <div className="text-white ml-3 text-md">
        Chargement de vos messages...
      </div>
    );
  }

  return (
    //ici je modifie la partie chatbot de maniere globale
    <div
      className="relative min-h-screen overflow-scroll scrollbar-hide flex flex-col justify-between"
      id="message-container"
    >
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-gray-950 h-fit">
        <h3 className="text-white text-xl font-bold">Chat</h3>
      </div>

      {/* message list */}
      <MessageList
        messages={messages}
        isLoading={isPending}
        role={message.role}
      />

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-4 mt-9 bg-gray-950"
      >
        <div className="flex">
          <Textarea
            value={input}
            onChange={handleInputChange}
            className="relative flex-1 text-md my-auto bg-gray-800 border-none text-white lg:text-xl rounded-xl focus:ring-0 focus:border-none"
            placeholder="Type your message..."
            rows={1}
          />
          <Button
            className="absolute right-0 top-0 bottom-0 my-auto mr-6
           bg-white rounded-full hover:bg-blue-400"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;

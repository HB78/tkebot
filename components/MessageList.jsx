"use client";
import { Loader2 } from "lucide-react";

const MessageList = ({ messages, isLoading }) => {
  const isUserColor =
    "rounded-xl text-sm shadow-md ring-1 ring-gray-900/10 p-3 max-w-[80%] bg-blue-600 text-white";
  const isBotColor =
    "rounded-xl text-sm shadow-md ring-1 ring-gray-900/10 p-3 max-w-[80%] bg-gray-800 text-white";

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!messages || messages.length === 0) {
    return <div className="text-white">Commencez une discussion.</div>;
  }
  if (!Array.isArray(messages)) return <>ceci n&apos;est pas un tableau</>;

  console.log("messages:PUTAIIIIIIIIN", messages);

  return (
    <div className="flex flex-col gap-3 px-4">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={
              message.role === "USER" || message.role === "user"
                ? "flex justify-end pl-10"
                : "flex justify-start pr-10"
            }
          >
            <div
              className={
                message.role === "USER" || message.role === "user"
                  ? "rounded-xl text-sm shadow-md ring-1 ring-gray-900/10 p-3 max-w-[80%] bg-blue-600 text-white"
                  : "rounded-xl text-sm shadow-md ring-1 ring-gray-900/10 p-3 max-w-[80%] bg-gray-800 text-white"
              }
            >
              <p>{message.content}</p>
              <div className="text-xs text-blue-500 mt-1">
                {message.role === "SYSTEM" || message.role === "assistant"
                  ? "tkebot"
                  : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;

"use client";
import { Loader2 } from "lucide-react";

const MessageList = ({ messages, isLoading }) => {
  const isUserPosition = "flex justify-end pl-10";
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
  if (!messages) return <></>;
  if (!messages || !Array.isArray(messages))
    return <>ceci n&apos;est pas un tableau</>;

  return (
    <div className="flex flex-col gap-3 px-4">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={
              message.role === "USER"
                ? isUserPosition
                : "flex justify-start pr-10"
            }
          >
            <div className={message.role === "USER" ? isUserColor : isBotColor}>
              <p>{message.content}</p>
              <div className="text-xs text-blue-500 mt-1">
                {message.role === "SYSTEM" ? "tkebot" : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;

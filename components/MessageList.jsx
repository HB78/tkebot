"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const MessageList = ({ messages, isLoading }) => {
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!messages) return <></>;
  if (!messages || !Array.isArray(messages))
    return <>ceci nest pas un tableau</>;

  return (
    <div className="flex flex-col gap-3 px-4">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10": message.role === "USER",
              "justify-start pr-10": message.role === "SYSTEM",
            })}
          >
            <div
              className={cn(
                "rounded-xl text-sm shadow-md ring-1 ring-gray-900/10 p-3 max-w-[80%]",
                {
                  "bg-blue-600 text-white": message.role === "USER",
                },
                {
                  "bg-gray-800 text-white": message.role === "SYSTEM",
                }
              )}
            >
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

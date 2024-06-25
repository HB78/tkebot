"use client";
import { useState } from "react";
import ChatComponent from "../ChatComponent";
import ChatSideBar from "../ChatSideBar";
import PDFViewer from "../PDFviewer";

export default function ComponentsOfChats({ chats, id, currentChatPDF }) {
  const [visible, setVisible] = useState(true);

  return (
    <div className="flex flex-col w-full h-full scrollbar-hide lg:max-h-screen lg:flex-row">
      {/* chat sidebar */}
      <div className="flex-[2] w-full overflow-scroll scrollbar-hide lg:max-w-xs lg:min-h-screen">
        <ChatSideBar
          chats={chats}
          chatId={id}
          pdfUrl={id}
          visible={visible}
          setVisible={setVisible}
        />
      </div>
      {/* pdf viewer */}
      {visible && (
        <div className="overflow-scroll scrollbar-hide flex-[2] lg:max-h-screen lg:flex-[5]">
          <PDFViewer pdfUrl={currentChatPDF} />
        </div>
      )}
      {/* chat component */}
      <div className="flex-[4] border-l-4 border-l-slate-200 overflow-scroll scrollbar-hide bg-gray-950">
        <ChatComponent chatId={id} />
      </div>
    </div>
  );
}

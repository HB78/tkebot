"use client";
import "./../../../app/global.css";

export const metadata = {
  title: "TKEBOT - Chat with any PDF",
  description:
    "Chat with any PDF with TKEBOT a chatbot made by Said for Thyssenkrupp Elevator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

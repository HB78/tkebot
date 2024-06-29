import Providers from "@/components/Providers";
import Favicon from "./../public/favicon.ico";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(`${process.env.NEXTAUTH_URL}`),
  title: "TKEBOT - Chat with any PDF with our most advanced AI",
  description:
    "Chat with any PDF with TKEBOT a chatbot made by Said for Thyssenkrupp Elevator, it's a chatbot that can help you with any PDF you have. Drop your PDF and start chatting with TKEBOT, it's free and easy to use. For TKE employees only.",
  icons: [{ rel: "icon", url: Favicon.src }],
  openGraph: {
    title:
      "tkebot - A chatbot for tke employees that can help you with any PDF you have",
    description:
      "Chat with any PDF with TKEBOT a chatbot made by Said for Thyssenkrupp Elevator, it's a chatbot that can help you with any PDF you have. Drop your PDF and start chatting with TKEBOT, it's free and easy to use. For TKE employees only.",
    url: "https://tkebot.vercel.app",
    locale: "en_FR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="fr">
        <body>{children}</body>
      </html>
    </Providers>
  );
}

import { Sessionprovidernextauth } from "@/components/sessionProvider/SessionProviderNextAuth";

export const metadata = {
  title: "Edit your profil",
  description:
    "Edit your profil for the best experience on our website TKEBOT.COM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Sessionprovidernextauth>{children}</Sessionprovidernextauth>
      </body>
    </html>
  );
}

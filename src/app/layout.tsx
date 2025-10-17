import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RCSeguros - Protegemos Você Como Se Fosse Nossa Família",
  description: "Desde 2002, protegendo o que mais importa para você e sua família",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="https://gistcdn.githack.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

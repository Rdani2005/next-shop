import type { Metadata } from "next";
import "@/styles/globals.css";

import { inter } from "@/config/fonts";
import { Provider } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s | Amigurus Store",
    default: "Home | Amigurus Store",
  },
  description: "Just another virtual store",
  creator: "Danny Sequeira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

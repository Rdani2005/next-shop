import type { Metadata } from "next";
import "@/styles/globals.css";

import { inter } from "@/config/fonts";

export const metadata: Metadata = {
    title: "Abby's Amigurumis Store | Amigurus",
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
            <body className={inter.className}>{children}</body>
        </html>
    );
}

import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { DefaultProp } from "@/types/default-prop";
import Providers from "./providers";

const font = Jost({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    fallback: [
        "Gill Sans",
        "Gill Sans MT",
        "Calibri",
        "Trebuchet MS",
        "sans-serif",
    ],
});

export const metadata: Metadata = {
    title: "Gantt Chart",
    description: "Made using nextjs, typescript and tailwindcss",
};

export default function RootLayout({ children }: Readonly<DefaultProp>) {
    return (
        <html lang="en">
            <body
                className={`${font.className} antialiased bg-background text-foreground`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

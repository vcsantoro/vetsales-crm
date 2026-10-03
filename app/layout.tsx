import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "VetSales CRM", description: "Prospecção B2B veterinária" };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}

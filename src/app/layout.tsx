import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xbox API Frontend",
  description: "Interface moderna para consumo de APIs do Xbox",
  keywords: ["Xbox", "API", "Games", "Gaming", "Achievements"],
  authors: [{ name: "Xbox API Frontend" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            <p className="footer-text">
              &copy; 2026 Xbox API Frontend. Feito com ❤️ para a comunidade
              Xbox.
            </p>
            <p className="footer-text">
              Este projeto não é afiliado à Microsoft ou Xbox.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

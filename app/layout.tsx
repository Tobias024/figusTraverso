import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Figus Traverso — Generador de figuritas",
  description:
    "Subí una foto, completá los datos y descargá tu figurita estilo Mundial en PNG.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

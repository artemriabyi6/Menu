
import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Home Menu — Домашня кулінарна книга",
  description:
    "Знаходь улюблені рецепти, відкривай нові страви та готуй із задоволенням.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}

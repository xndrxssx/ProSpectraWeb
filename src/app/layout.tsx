import { ReactNode } from "react";
import '../styles/globals.css';  // Certifique-se de que o caminho está correto

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

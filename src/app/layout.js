import "./globals.css";

export const metadata = {
  title: "Botpress Competitive Intelligence",
  description: "AI Customer Service Market — Competitive Landscape Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  title: "HOTJET - Generátor nabídek tepelných čerpadel",
  description:
    "Profesionální generátor cenových nabídek pro tepelná čerpadla HOTJET",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}

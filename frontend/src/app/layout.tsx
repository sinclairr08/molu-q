import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="mt-12 mb-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

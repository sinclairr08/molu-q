import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import { QuizProvider } from "@/contexts/QuizContext";

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
        <QuizProvider>
          <Header />
          <main className="mt-16 mb-20">{children}</main>
          <Footer />
        </QuizProvider>
      </body>
    </html>
  );
}

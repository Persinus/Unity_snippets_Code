
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { FirebaseClientProvider } from "@/firebase/client-provider"; // Import the provider
import { Source_Code_Pro, Fira_Code } from 'next/font/google';
import Link from "next/link";

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Unity Codex",
  description: "A modern blog for collecting and sharing Unity C# code snippets.",
  verification: {
    google: 'BkguS3oS48hEyhzSJnWY1IsfKr13lJZiM9lEZ7ELRGs',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sourceCodePro.variable} ${firaCode.variable}`}>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="container mx-auto flex-grow px-4 py-8 md:px-6">
                {children}
              </main>
              <footer className="border-t py-6 md:px-6 md:py-8">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground sm:flex-row">
                  <p>&copy; {new Date().getFullYear()} Unity Codex. All rights reserved.</p>
                  <nav className="flex items-center gap-4 sm:gap-6">
                    <Link href="/about" className="hover:text-primary transition-colors">Về chúng tôi</Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">Liên hệ</Link>
                    <Link href="/privacy-policy" className="hover:text-primary transition-colors">Chính sách Bảo mật</Link>
                  </nav>
                </div>
              </footer>
            </div>
            <Toaster />
          </ThemeProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}

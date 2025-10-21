
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { FirebaseClientProvider } from "@/firebase/client-provider"; // Import the provider
import { Source_Code_Pro } from 'next/font/google';

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Unity Codex",
  description: "A modern blog for collecting and sharing Unity C# code snippets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={sourceCodePro.variable}>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="container mx-auto flex-grow px-4 py-8 md:px-6">
                {children}
              </main>
              <footer className="py-6 md:px-6 md:py-8">
                <div className="container mx-auto text-center text-sm text-muted-foreground">
                  <p>&copy; {new Date().getFullYear()} Unity Codex. All rights reserved.</p>
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

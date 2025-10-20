import Link from "next/link";
import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo />
        </Link>
        <nav className="hidden flex-1 items-center space-x-4 text-sm font-medium text-muted-foreground md:flex">
          <Link
            href="/"
            className="transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="#"
            className="transition-colors hover:text-foreground"
          >
            Categories
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
           {/* A search input can be added here in the future */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

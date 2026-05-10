import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="Spotlight" className="h-8 w-auto" />
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden sm:inline-flex">Log in</Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
}

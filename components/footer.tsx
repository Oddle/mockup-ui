"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  const links = [
    {
      href: "/item-availability",
      label: "Item Availability"
    },
    {
      href: "/item-store-availability",
      label: "Store Availability"
    }
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-center space-x-4">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
} 
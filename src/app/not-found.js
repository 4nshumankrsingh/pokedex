"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-pokedex">
      <div className="bg-screen-bg screen-border rounded-2xl p-8 shadow-pokedex">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-digital font-bold text-screen-text text-glow-green">404</h1>
          <p className="mb-4 text-xl font-digital text-screen-text/70">ERROR: Route not found in database</p>
          <Link 
            href="/" 
            className="inline-block bg-pokedex-blue hover:bg-pokedex-blue-dark text-white px-6 py-2 rounded-lg font-digital transition-colors"
          >
            Return to Pokédex
          </Link>
        </div>
      </div>
    </div>
  );
}
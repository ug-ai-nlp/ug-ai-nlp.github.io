"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

export default function Banner({ title }: { title: string }) {
  const [show, setShow] = useState(false);

  function handleScroll() {
    if (window.scrollY > 176) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "bg-background animate-in fade-in-0 sticky top-16 z-10 ml-16 hidden h-16 w-[calc(100%-6rem)] duration-500",
        show && "lg:block"
      )}
    >
      <ul className="flex h-full items-center space-x-2 text-sm">
        <li className="flex items-center space-x-2">
          <a
            href="/docs"
            className="text-muted-foreground inline whitespace-nowrap"
          >
            Documentación
          </a>
          <ChevronRight className="text-muted-foreground h-4 w-4" />
        </li>
        <li className="text-muted-foreground line-clamp-1 hidden lg:block">
          {title}
        </li>
      </ul>
    </div>
  );
}

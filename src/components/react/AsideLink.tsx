import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Button } from "@/ui/button";
import * as Tooltip from "@/ui/tooltip";

export function AsideLink({
  href,
  children,
  exact = false,
  pathname = "/",
}: {
  href: string;
  exact?: boolean;
  pathname?: string;
  children?: ReactNode;
}) {
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  const isExternal = href.startsWith("http");

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button
            asChild
            variant="ghost"
            className={cn(
              "text-muted-foreground flex w-full grow items-center justify-start gap-2",
              isExternal && "pl-3",
              isActive && "bg-accent text-accent-foreground"
            )}
          >
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
            >
              <span className="line-clamp-1">{children}</span>
            </a>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content align="center" side="right">
          {children}
          <Tooltip.Arrow className="fill-secondary" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

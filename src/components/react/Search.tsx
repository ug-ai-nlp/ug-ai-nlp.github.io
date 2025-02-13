import { Calendar, File, Github, Slack } from "lucide-react";
import { useEffect, useState } from "react";

import type { PageLink } from "@/lib/sitemap";

import { SiteConfig } from "@/config";

import * as Command from "./Command";

type SearchProps = {
  pathname: string;
  labs: PageLink[];
  projects: PageLink[];
  tutorials: PageLink[];
  notes: PageLink[];
};

export function Search({ labs, projects, tutorials, notes }: SearchProps) {
  const [open, setOpen] = useState(false);

  function handleProgramClick() {
    window.open(SiteConfig.program, "_blank");
  }

  function handleCalendarClick() {
    window.location.href = "/calendar";
  }

  function handleGitHubClick() {
    window.open(SiteConfig.github, "_blank");
  }

  function handleSlackClick() {
    window.open(SiteConfig.slack, "_blank");
  }

  function handlePostClick(href: string) {
    return () => {
      window.location.href = href;
      setOpen(false);
    };
  }

  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    }

    function click(e: MouseEvent) {
      e.preventDefault();
      setOpen((open) => !open);
    }

    document.addEventListener("keydown", down);
    document.getElementById("command-k")?.addEventListener("click", click);

    return () => {
      document.removeEventListener("keydown", down);
      document.getElementById("command-k")?.removeEventListener("click", click);
    };
  }, []);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen}>
      <Command.Input placeholder="Escribe un comando o busca..." />
      <Command.List>
        <Command.Empty>No hay resultados para la búsqueda</Command.Empty>
        <Command.Group heading="Externo">
          <Command.Item onSelect={handleProgramClick}>
            <File className="mr-2 h-4 w-4" />
            <span>Inicio</span>
          </Command.Item>
          <Command.Item onSelect={handleCalendarClick}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendario 2025</span>
          </Command.Item>
          <Command.Item onSelect={handleGitHubClick}>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </Command.Item>
          <Command.Item onSelect={handleSlackClick}>
            <Slack className="mr-2 h-4 w-4" />
            <span>Slack</span>
          </Command.Item>
        </Command.Group>
        {labs.length > 0 && (
          <>
            <Command.Separator />
            <Command.Group heading="Laboratorios">
              {labs.map((l) => (
                <Command.Item key={l.href} onSelect={handlePostClick(l.href)}>
                  <span>{l.title}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </>
        )}
        {projects.length > 0 && (
          <>
            <Command.Separator />
            <Command.Group heading="Proyectos">
              {projects.map((p) => (
                <Command.Item key={p.href} onSelect={handlePostClick(p.href)}>
                  <span>{p.title}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </>
        )}
        {tutorials.length > 0 && (
          <>
            <Command.Separator />
            <Command.Group heading="Tutoriales">
              {tutorials.map((t) => (
                <Command.Item key={t.href} onSelect={handlePostClick(t.href)}>
                  <span>{t.title}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </>
        )}
        {notes.length > 0 && (
          <>
            <Command.Separator />
            <Command.Group heading="Notas">
              {notes.map((n) => (
                <Command.Item key={n.href} onSelect={handlePostClick(n.href)}>
                  <span>{n.title}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </>
        )}
      </Command.List>
    </Command.Dialog>
  );
}

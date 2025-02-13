import type { MarkdownLayoutProps } from "astro";

import { SiteConfig } from "@/config";

export type PageProps = MarkdownLayoutProps<{
  title: string;
  description: string;
}>;

export type PageLink = {
  title: string;
  href: string;
};

export function getSitemap(pathname: string) {
  const labMatches = import.meta.glob("../pages/lab/*.mdx", {
    eager: true,
  });

  const projectMatches = import.meta.glob("../pages/proj/*.mdx", {
    eager: true,
  });

  const tutorialMatches = import.meta.glob("../pages/tutorial/*.mdx", {
    eager: true,
  });

  const noteMatches = import.meta.glob("../pages/note/*.mdx", {
    eager: true,
  });

  const labs = Object.entries(labMatches).map(([path, unk]) => {
    const component = unk as PageProps;

    return {
      title: component.frontmatter.title,
      href: path.replace("../pages", "").replace(".mdx", ""),
    };
  });

  const projects = Object.entries(projectMatches).map(([path, unk]) => {
    const component = unk as PageProps;

    return {
      title: component.frontmatter.title,
      href: path.replace("../pages", "").replace(".mdx", ""),
    };
  });

  const tutorials = Object.entries(tutorialMatches).map(([path, unk]) => {
    const component = unk as PageProps;

    return {
      title: component.frontmatter.title,
      href: path.replace("../pages", "").replace(".mdx", ""),
    };
  });

  const notes = Object.entries(noteMatches).map(([path, unk]) => {
    const component = unk as PageProps;

    return {
      title: component.frontmatter.title,
      href: path.replace("../pages", "").replace(".mdx", ""),
    };
  });

  const home = {
    title: "Introducción",
    href: "/",
    index: 0,
  };

  const program = {
    title: "Introducción",
    href: SiteConfig.program,
    index: 1,
  };

  const calendar = {
    title: "Calendario",
    href: "/calendar",
    index: 2,
  };

  const routes = [...labs, ...projects, ...tutorials, ...notes].map(
    (component, index) => {
      return {
        ...component,
        index: index + 3,
      };
    }
  );

  const allRoutes = [home, program, calendar, ...routes];

  const currentComponent = allRoutes.find((component) => {
    return component.href === pathname || `${component.href}/` === pathname;
  })!;

  const previous = allRoutes[currentComponent.index - 1];
  const next = allRoutes[currentComponent.index + 1];

  return {
    labs,
    projects,
    tutorials,
    notes,
    next,
    previous,
  };
}

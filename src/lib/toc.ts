import type { MarkdownHeading } from "astro";

export type TOCNode = {
  depth: number;
  text: string;
  slug: string;
  subheadings: TOCNode[];
};

export function buildToc(headings: MarkdownHeading[]) {
  const toc: TOCNode[] = [];
  const parentHeadings = new Map();
  headings.forEach((h) => {
    const heading = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);
    // Change 2 to 1 if your markdown includes your <h1>
    if (heading.depth === 2) {
      toc.push(heading);
    } else {
      parentHeadings.get(heading.depth - 1).subheadings.push(heading);
    }
  });

  return toc;
}

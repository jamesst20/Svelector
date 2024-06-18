import { defineMDSveXConfig as defineConfig } from "mdsvex";
import { join, resolve } from "node:path";

import highlighter from "./codeHighlighter.js";

const __dirname = resolve();

const config = defineConfig({
  extensions: [".md", ".svx"],
  highlight: {
    highlighter,
  },
  layout: join(__dirname, "./src/MarkdownLayout.svelte"),
  rehypePlugins: [],
  remarkPlugins: [],
  smartypants: {
    backticks: true,
    dashes: "oldschool",
    ellipses: true,
    quotes: true,
  },
  theme: "dark-plus",
});

export default config;

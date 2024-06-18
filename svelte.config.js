import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

import mdsvexConfig from "./mdsvex/mdsvex.config.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...(mdsvexConfig.extensions || [])],

  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
  },

  // for more information about preprocessors
  preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
};

export default config;

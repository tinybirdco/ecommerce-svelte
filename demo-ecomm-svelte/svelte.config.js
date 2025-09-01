import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

import { preprocessMeltUI } from '@melt-ui/pp';
import sequence from 'svelte-sequential-preprocessor';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      runtime: 'nodejs22.x'
    })
  },

  preprocess: sequence([
    preprocess({
      postcss: true
    }),
    preprocessMeltUI()
  ])
};

export default config;

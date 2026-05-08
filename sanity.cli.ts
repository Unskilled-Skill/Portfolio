import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'sl7hlzy0',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
});

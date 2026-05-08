import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'sl7hlzy0';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2026-05-08';

export default defineConfig({
  name: 'default',
  title: 'Rochee Portfolio',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({
      title: 'GROQ Vision',
      defaultApiVersion: apiVersion,
      defaultDataset: dataset,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});

import { defineArrayMember, defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'media', title: 'Media' },
    { name: 'content', title: 'Content' },
    { name: 'navigation', title: 'Navigation' },
  ],
  orderings: [
    {
      title: 'Portfolio order',
      name: 'portfolioOrder',
      by: [{ field: 'navOrder', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Dutch', value: 'nl' },
        ],
        layout: 'radio',
      },
      initialValue: 'en',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'overview', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', group: 'overview', validation: (rule) => rule.required() }),
    defineField({ name: 'heroImage', title: 'Hero image', type: 'image', group: 'media', options: { hotspot: true } }),
    defineField({
      name: 'heroImageFallback',
      title: 'Hero Image Fallback Path',
      type: 'string',
      group: 'media',
      description: 'Used only if no Sanity hero image is set.',
    }),
    defineField({ name: 'youtubeId', title: 'YouTube ID', type: 'string', group: 'media' }),
    defineField({ name: 'overview', title: 'Overview', type: 'text', rows: 4, group: 'overview', validation: (rule) => rule.required().min(40).max(500) }),
    defineField({
      name: 'meta',
      title: 'Meta',
      type: 'object',
      group: 'overview',
      fields: [
        defineField({ name: 'role', title: 'Role', type: 'string' }),
        defineField({ name: 'tools', title: 'Tools', type: 'string' }),
        defineField({ name: 'focus', title: 'Focus', type: 'string' }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({
              name: 'src',
              title: 'Fallback path',
              type: 'string',
              description: 'Used only if no Sanity image is set.',
            }),
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'overlay', title: 'Overlay Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'overlay', subtitle: 'alt', media: 'image' },
          },
        }),
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      group: 'overview',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'bodySections',
      title: 'Body Sections',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({
              name: 'paragraphs',
              title: 'Paragraphs',
              type: 'array',
              of: [defineArrayMember({ type: 'text', rows: 4 })],
            }),
            defineField({
              name: 'list',
              title: 'List',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'paragraphs.0' },
          },
        }),
      ],
    }),
    defineField({ name: 'navOrder', title: 'Navigation Order', type: 'number', group: 'navigation', validation: (rule) => rule.required().integer().min(1) }),
    defineField({ name: 'featured', title: 'Featured on Home', type: 'boolean', group: 'navigation', initialValue: false }),
    defineField({
      name: 'spotlightDirection',
      title: 'Spotlight Direction',
      type: 'string',
      group: 'navigation',
      options: { list: ['left', 'right'], layout: 'radio' },
      initialValue: 'right',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'prevSlug', title: 'Previous Project Slug', type: 'string', group: 'navigation' }),
    defineField({ name: 'nextSlug', title: 'Next Project Slug', type: 'string', group: 'navigation' }),
    defineField({
      name: 'process',
      title: 'Process',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'phase', title: 'Phase', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'phase', subtitle: 'description' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'language',
      media: 'heroImage',
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: `${subtitle === 'nl' ? 'Dutch' : 'English'} project`,
      media,
    }),
  },
});

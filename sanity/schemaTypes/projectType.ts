import { defineArrayMember, defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'heroImageFallback',
      title: 'Hero Image Fallback Path',
      type: 'string',
      description: 'Optional public path such as /images/ar-game1.png.',
    }),
    defineField({ name: 'youtubeId', title: 'YouTube ID', type: 'string' }),
    defineField({ name: 'overview', title: 'Overview', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: 'meta',
      title: 'Meta',
      type: 'object',
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
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'src', title: 'Fallback Path', type: 'string' }),
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
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'bodySections',
      title: 'Body Sections',
      type: 'array',
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
    defineField({ name: 'navOrder', title: 'Navigation Order', type: 'number', validation: (rule) => rule.required() }),
    defineField({ name: 'featured', title: 'Featured on Home', type: 'boolean', initialValue: false }),
    defineField({
      name: 'spotlightDirection',
      title: 'Spotlight Direction',
      type: 'string',
      options: { list: ['left', 'right'], layout: 'radio' },
      initialValue: 'right',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'prevSlug', title: 'Previous Project Slug', type: 'string' }),
    defineField({ name: 'nextSlug', title: 'Next Project Slug', type: 'string' }),
    defineField({
      name: 'process',
      title: 'Process',
      type: 'array',
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
      subtitle: 'subtitle',
      media: 'heroImage',
    },
  },
});

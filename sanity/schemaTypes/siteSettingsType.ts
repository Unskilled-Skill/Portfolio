import { defineArrayMember, defineField, defineType } from 'sanity';

const languageField = defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  options: {
    list: [
      { title: 'English', value: 'en' },
      { title: 'Dutch', value: 'nl' },
    ],
    layout: 'radio',
  },
  initialValue: 'en',
  validation: (rule) => rule.required(),
});

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'home', title: 'Home' },
    { name: 'navigation', title: 'Navigation & UI' },
    { name: 'social', title: 'Social' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    { ...languageField, group: 'identity' },
    defineField({
      name: 'identity',
      title: 'Identity',
      type: 'object',
      group: 'identity',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'email', title: 'Email', type: 'string', validation: (rule) => rule.required().email() }),
        defineField({ name: 'cvPath', title: 'CV path', type: 'string' }),
        defineField({ name: 'avatar', title: 'Avatar path', type: 'string' }),
        defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'siteTitle', title: 'Site title', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (rule) => rule.required().max(220) }),
        defineField({ name: 'siteUrl', title: 'Site URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'roles',
      title: 'Hero roles',
      type: 'array',
      group: 'home',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'object',
      group: 'home',
      fields: [
        defineField({
          name: 'paragraphs',
          title: 'Paragraphs',
          type: 'array',
          of: [defineArrayMember({ type: 'text', rows: 4 })],
        }),
        defineField({ name: 'institution', title: 'Institution line', type: 'string' }),
        defineField({
          name: 'coreSkills',
          title: 'Core skills',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'icon', title: 'Lucide icon', type: 'string' }),
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'detail', title: 'Detail', type: 'string' }),
              ],
              preview: { select: { title: 'label', subtitle: 'detail' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'techStack',
      title: 'Technology badges',
      type: 'array',
      group: 'home',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'icon', title: 'Lucide icon', type: 'string' }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: { list: ['engine', 'language', 'tool', 'design'] },
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'category' } },
        }),
      ],
    }),
    defineField({ name: 'startYear', title: 'Start year', type: 'number', group: 'home', validation: (rule) => rule.required().integer().min(2000) }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      group: 'social',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon key', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),
    defineField({
      name: 'ui',
      title: 'Interface labels',
      type: 'object',
      group: 'navigation',
      fields: [
        'back', 'contact', 'copyEmail', 'copied', 'downloadCv', 'expertise', 'featured',
        'goBack', 'goHome', 'home', 'keyHighlights', 'languageEnglish', 'languageDutch',
        'notFoundDescription', 'notFoundEyebrow', 'notFoundTitle', 'processTitle',
        'projectVideo', 'projects', 'readMore', 'skillsTitle', 'statsProjects',
        'statsTechnologies', 'statsYears', 'technologiesTitle', 'viewAllProjects',
        'viewProject', 'viewProjects', 'whoIAm', 'work',
      ].map((name) => defineField({ name, title: name, type: name.includes('Description') ? 'text' : 'string' })),
    }),
  ],
  preview: {
    select: {
      title: 'identity.name',
      subtitle: 'language',
    },
    prepare: ({ title, subtitle }) => ({
      title: title || 'Site settings',
      subtitle: subtitle === 'nl' ? 'Dutch' : 'English',
    }),
  },
});

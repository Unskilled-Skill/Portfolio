import { defineField, defineType } from 'sanity';

export const skillType = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Label',
      name: 'labelAsc',
      by: [{ field: 'label', direction: 'asc' }],
    },
  ],
  fields: [
    defineField({
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
    }),
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'icon',
      title: 'Lucide Icon',
      type: 'string',
      description: 'Use a lucide-react icon name such as Gamepad2, Box, or Eye.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0, validation: (rule) => rule.required().integer().min(0) }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'description',
    },
  },
});

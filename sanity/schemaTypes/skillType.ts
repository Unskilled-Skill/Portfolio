import { defineField, defineType } from 'sanity';

export const skillType = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'icon',
      title: 'Lucide Icon',
      type: 'string',
      description: 'Use a lucide-react icon name such as Gamepad2, Box, or Eye.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'description',
    },
  },
});

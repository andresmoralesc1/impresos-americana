import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Categoría de Producto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título de la Categoría",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identificador (Slug)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Orden de visualización",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});

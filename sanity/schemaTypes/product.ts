import { defineArrayMember, defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Producto del Catálogo",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre del Producto",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identificador URL (Slug)",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reference",
      title: "Referencia de Producción (ej: Ref. Termo 500 ml)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceCOP",
      title: "Precio Unitario en COP (ej: $25.635 COP)",
      type: "string",
      description: "Valor formateado en Pesos Colombianos para cotizaciones o venta directa",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "minOrder",
      title: "Cantidad Mínima de Pedido (ej: Mínimo 25 uds)",
      type: "string",
      initialValue: "Mínimo 25 uds",
    }),
    defineField({
      name: "image",
      title: "Fotografía Real del Producto",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "specs",
      title: "Especificaciones Técnicas (Viñetas)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Materiales, acabados, capacidad o dimensiones",
    }),
    defineField({
      name: "active",
      title: "¿Visible en el Catálogo?",
      type: "boolean",
      initialValue: true,
      description: "Desmarca esta opción si el producto está temporalmente agotado",
    }),
    defineField({
      name: "order",
      title: "Prioridad en catálogo",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "priceCOP",
      media: "image",
    },
  },
});

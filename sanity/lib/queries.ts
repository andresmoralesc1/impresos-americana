import { groq } from "next-sanity";

export const PRODUCTS_QUERY = groq`
  *[_type == "product" && active == true] | order(order asc, _createdAt desc) {
    "id": _id,
    name,
    "slug": coalesce(slug.current, _id),
    reference,
    "category": coalesce(category->slug.current, category, "termos"),
    "categoryLabel": select(
      category == "termos" => "Termos & Botellas",
      category == "agendas" => "Agendas & Libretas",
      category == "esferos" => "Esferos & Bolígrafos",
      category == "llaveros-usb" => "Llaveros & USBs",
      category == "bolsas" => "Bolsas & Empaques",
      category == "tecnologia" => "Tecnología & Accesorios",
      category == "otros" => "Otros Artículos",
      category->title != null => category->title,
      "General"
    ),
    priceCOP,
    "image": image,
    specs,
    minOrder
  }
`;

export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(order asc) {
    "id": slug.current,
    "label": title
  }
`;

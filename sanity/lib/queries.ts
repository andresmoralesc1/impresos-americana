import { groq } from "next-sanity";

export const PRODUCTS_QUERY = groq`
  *[_type == "product" && active == true] | order(order asc, _createdAt desc) {
    "id": _id,
    name,
    "slug": coalesce(slug.current, _id),
    reference,
    "category": coalesce(category->slug.current, category, "termos"),
    "categoryLabel": coalesce(
      category->title,
      select(
        category == "termos" => "Termos & Botellas",
        category == "agendas" => "Agendas & Libretas",
        category == "esferos" => "Esferos & Bolígrafos",
        category == "llaveros-usb" => "Llaveros & USBs",
        category == "bolsas" => "Bolsas & Empaques",
        category == "tecnologia" => "Tecnología & Accesorios",
        category == "otros" => "Otros Artículos",
        "General"
      )
    ),
    priceCOP,
    "image": image,
    "gallery": gallery,
    specs,
    minOrder
  }
`;

export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(order asc, title asc) {
    "id": slug.current,
    "label": title
  }
`;

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    whatsappNumber,
    contactEmail,
    address,
    businessHours,
    announcementActive,
    announcementBadge,
    announcementText,
    announcementLink,
    "catalogPdfMaestroUrl": catalogPdfMaestro.asset->url,
    "catalogPdfEsferosUrl": catalogPdfEsferos.asset->url,
    "catalogPdfEspecialesUrl": catalogPdfEspeciales.asset->url
  }
`;

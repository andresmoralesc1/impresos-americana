import { groq } from "next-sanity";

export const PRODUCTS_QUERY = groq`
  *[_type == "product" && active == true] | order(order asc, _createdAt desc) {
    "id": _id,
    name,
    "slug": slug.current,
    reference,
    "category": category->slug.current,
    "categoryLabel": category->title,
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

import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const imageBuilder = projectId
  ? createImageUrlBuilder({
      projectId: projectId || "",
      dataset: dataset || "production",
    })
  : null;

export const urlForImage = (source: Image | null | undefined) => {
  if (!imageBuilder || !source?.asset) {
    return null;
  }
  return imageBuilder.image(source).auto("format").fit("max");
};

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "../env";

export const isSanityConfigured = Boolean(
  projectId && projectId.trim() !== "" && projectId !== "mock-project-id"
);

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : null;

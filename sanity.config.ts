import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  basePath: "/admin",
  projectId: projectId || "mock-project-id",
  dataset: dataset || "production",
  title: "Impresos Americana — Panel de Catálogo",
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool()],
});

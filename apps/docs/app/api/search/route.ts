import { getPages } from "@/utils/source";
import { createSearchAPI } from "next-docs-zeta/search/server";

export const { GET } = createSearchAPI("advanced", {
  indexes: getPages().map((page) => ({
    title: page.data.title,
    structuredData: page.data.exports.structuredData,
    id: page.file.name,
    url: page.url,
  })),
});

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://pool-game-zack-forssbergs-projects.vercel.app/",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://pool-game-zack-forssbergs-projects.vercel.app/rules",
      lastModified: new Date().toISOString(),
    },
  ];
}

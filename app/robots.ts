import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  return {
    rules: [
      {
        userAgent: "*",
        allow: isProduction ? "/" : [],
        disallow: isProduction ? ["/api/", "/admin/", "/*.json$"] : ["/"],
      },
      // More aggressive crawling for good bots
      {
        userAgent: ["Googlebot", "Googlebot-Image", "Googlebot-Mobile"],
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: ["Bingbot"],
        allow: "/",
        crawlDelay: 1,
      },
      // Restrict bad bots
      {
        userAgent: ["AhrefsBot", "SemrushBot", "DotBot"],
        disallow: "/",
      },
    ],
    sitemap: "https://www.architect-kindt.be/sitemap.xml",
    host: "https://www.architect-kindt.be",
  };
}

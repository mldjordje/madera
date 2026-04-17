import { siteUrlFallback } from "./_lib/seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/svecanasala", "/restoran", "/cenovnik", "/bazen", "/kontakt"],
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: new URL("/sitemap.xml", siteUrlFallback).toString(),
    host: siteUrlFallback.toString(),
  };
}

import { siteUrlFallback } from "./_lib/seo";

const routes = ["/", "/svecanasala", "/restoran", "/bazen", "/kontakt"];

export default function sitemap() {
  const now = new Date();

  return routes.map((route) => ({
    url: new URL(route, siteUrlFallback).toString(),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}

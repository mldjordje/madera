import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://ageless.rs';
  const routes = [
    '/', '/about', '/about-2', '/gallery', '/gallery-2', '/reviews', '/reservation', '/faq', '/menu', '/menu-2', '/menu-3', '/menu-4', '/menu-5', '/menu-6', '/blog', '/blog-2', '/blog-3', '/contact', '/shop', '/shop-2', '/products', '/products-2', '/product', '/cart', '/checkout'
  ];
  return routes.map((path) => ({ url: `${base}${path}`, changeFrequency: 'weekly', priority: path === '/' ? 1 : 0.7 }));
}


const siteUrlCandidate =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "");

function normalizeSiteUrl(value) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value.startsWith("http") ? value : `https://${value}`);
  } catch (error) {
    return null;
  }
}

export const siteUrl = normalizeSiteUrl(siteUrlCandidate);

export const businessInfo = {
  name: "Hotel-Restoran Madera",
  shortName: "Madera",
  description:
    "Madera kod Nisa spaja svecane sale, restoran u prirodi i letnji bazen za porodicne, svecane i poslovne trenutke.",
  locale: "sr_RS",
  phonePrimary: "+381607180659",
  phonePrimaryDisplay: "+381 60 718 06 59",
  phoneSecondary: "+381183100971",
  phoneSecondaryDisplay: "+381 18 310 09 71",
  mapsUrl: "https://maps.app.goo.gl/52x387CwuJdTroXb7",
  locality: "Okolina Nisa",
  region: "Nisavski okrug",
  country: "RS",
  heroImage: "/img/4.jpg",
};

export const siteUrlFallback = siteUrl || new URL("http://localhost:3000");

function toAbsoluteUrl(path) {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (!siteUrl) {
    return null;
  }

  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = businessInfo.heroImage,
  type = "website",
}) {
  const absolutePath = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(image) || image;
  const hasAbsoluteImage = Boolean(toAbsoluteUrl(image));

  const metadata = {
    title,
    description,
    keywords,
    other: {
      "geo.region": "RS-20",
      "geo.placename": "Nis",
      "contact:phone_number": businessInfo.phonePrimary,
      "contact:locality": businessInfo.locality,
    },
    openGraph: {
      title,
      description,
      type,
      locale: businessInfo.locale,
      siteName: businessInfo.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };

  if (hasAbsoluteImage) {
    metadata.openGraph.images = [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ];
    metadata.twitter.images = [imageUrl];
  }

  if (absolutePath) {
    metadata.alternates = { canonical: absolutePath };
    metadata.openGraph.url = absolutePath;
  }

  return metadata;
}

function buildBaseSchema({
  type,
  name,
  description,
  path = "/",
  image = businessInfo.heroImage,
}) {
  const url = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(image);
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    telephone: businessInfo.phonePrimary,
    areaServed: {
      "@type": "City",
      name: "Nis",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nis",
      addressRegion: businessInfo.region,
      addressCountry: businessInfo.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: businessInfo.phonePrimary,
        areaServed: "RS",
        availableLanguage: ["sr"],
      },
      {
        "@type": "ContactPoint",
        contactType: "reservations",
        telephone: businessInfo.phoneSecondary,
        areaServed: "RS",
        availableLanguage: ["sr"],
      },
    ],
    hasMap: businessInfo.mapsUrl,
    image: imageUrl || image,
  };

  if (url) {
    schema.url = url;
  }

  return schema;
}

export function buildWebSiteSchema() {
  const url = toAbsoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: businessInfo.name,
    description: businessInfo.description,
    inLanguage: "sr",
    ...(url ? { url } : {}),
  };
}

export function buildLocalBusinessSchema({ path = "/", description, image = businessInfo.heroImage }) {
  return buildBaseSchema({
    type: "LocalBusiness",
    name: businessInfo.name,
    description: description || businessInfo.description,
    path,
    image,
  });
}

export function buildRestaurantSchema({ name, description, path, image }) {
  return buildBaseSchema({
    type: "Restaurant",
    name,
    description,
    path,
    image,
  });
}

export function buildEventVenueSchema({ name, description, path, image }) {
  return buildBaseSchema({
    type: "EventVenue",
    name,
    description,
    path,
    image,
  });
}

export function buildPoolSchema({ name, description, path, image }) {
  return buildBaseSchema({
    type: "SportsActivityLocation",
    name,
    description,
    path,
    image,
  });
}

export function buildContactPageSchema({ description }) {
  const url = toAbsoluteUrl("/kontakt");

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Kontakt | ${businessInfo.name}`,
    description,
    inLanguage: "sr",
    ...(url ? { url } : {}),
    mainEntity: buildBaseSchema({
      type: "LocalBusiness",
      name: businessInfo.name,
      description: businessInfo.description,
      path: "/",
      image: businessInfo.heroImage,
    }),
  };
}

export function buildFaqSchema(entries = []) {
  if (!entries.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

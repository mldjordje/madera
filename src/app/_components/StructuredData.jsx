import Script from "next/script";

export default function StructuredData({ id, data }) {
  if (!data) {
    return null;
  }

  return (
    <Script id={id} type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(data)}
    </Script>
  );
}

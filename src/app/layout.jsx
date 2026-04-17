import Script from "next/script";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import "@mantine/core/styles.css";
import { businessInfo, siteUrl, siteUrlFallback } from "./_lib/seo";

export const metadata = {
  metadataBase: siteUrl || siteUrlFallback,
  title: {
    default: "Hotel-Restoran Madera | Svecane sale, restoran i bazen kod Nisa",
    template: "%s | Hotel-Restoran Madera",
  },
  description: businessInfo.description,
  applicationName: businessInfo.name,
  keywords: [
    "hotel restoran Madera",
    "svecana sala Nis",
    "restoran Nis",
    "proslave kod Nisa",
    "letnji bazen Nis",
  ],
  alternates: {
    canonical: siteUrl ? siteUrl.toString() : undefined,
  },
  openGraph: {
    title: "Hotel-Restoran Madera | Svecane sale, restoran i bazen kod Nisa",
    description: businessInfo.description,
    locale: businessInfo.locale,
    siteName: businessInfo.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel-Restoran Madera | Svecane sale, restoran i bazen kod Nisa",
    description: businessInfo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

if (siteUrl) {
  metadata.openGraph.images = [
    {
      url: businessInfo.heroImage,
      width: 1200,
      height: 630,
      alt: businessInfo.name,
    },
  ];
  metadata.twitter.images = [businessInfo.heroImage];
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

import MobileCallButton from "@/components/MobileCallButton";

const Layouts = ({ children }) => {
  return (
    <html lang="sr" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link rel="stylesheet" href="/the8/style.css" />
        <link rel="stylesheet" href="/the8/css/aos.css" />
        <link rel="stylesheet" href="/the8/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/the8/css/lenis.css" />
        <link rel="stylesheet" href="/the8/gallery/finaltilesgallery.css" />
        <link rel="stylesheet" href="/the8/gallery/lightbox2.css" />
      </head>
      <body className="home wp-singular page-template-default page page-id-23 wp-theme-the8project">
        <MantineProvider defaultColorScheme="light">
          {children}
          <MobileCallButton />
        </MantineProvider>
        <Script src="/the8/js/jquery.min.js" strategy="afterInteractive" />
        <Script src="/the8/js/lenis.min.js" strategy="afterInteractive" />
        <Script src="/the8/js/aos.js" strategy="afterInteractive" />
        <Script src="/the8/js/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/the8/gallery/jquery.finaltilesgallery.js" strategy="afterInteractive" />
        <Script src="/the8/gallery/lightbox2.js" strategy="afterInteractive" />
        <Script src="/the8/gsap-premium/minified/gsap.min.js" strategy="afterInteractive" />
        <Script src="/the8/gsap-premium/minified/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/the8/gsap-premium/minified/ScrollSmoother.min.js" strategy="afterInteractive" />
        <Script src="/the8/gsap-premium/minified/SplitText.min.js" strategy="afterInteractive" />
        <Script src="/the8/animations.js" strategy="afterInteractive" />
        <Script id="the8-init" strategy="afterInteractive">
          {`
            (function () {
              var tries = 0;
              var maxTries = 30;

              function revealAosFallback() {
                document.querySelectorAll('[data-aos]').forEach(function (el) {
                  el.classList.add('aos-animate');
                  el.style.opacity = '1';
                  el.style.transform = 'none';
                });
              }

              function initThe8() {
              if (window.AOS) {
                window.AOS.refreshHard && window.AOS.refreshHard();
                window.AOS.init({ duration: 1300, once: true });
              } else {
                tries += 1;
                if (tries < maxTries) {
                  window.setTimeout(initThe8, 120);
                } else {
                  revealAosFallback();
                }
                return;
              }
              if (window.Swiper) {
                document.querySelectorAll('.mySwiper').forEach(function (el) {
                  if (el.swiper) return;
                  new window.Swiper(el, {
                  loop: true,
                  speed: 800,
                  spaceBetween: 32,
                  pagination: {
                    el: el.querySelector('.swiper-pagination'),
                    type: 'fraction',
                  },
                  navigation: {
                    nextEl: el.querySelector('.swiper-button-next'),
                    prevEl: el.querySelector('.swiper-button-prev'),
                  },
                });
                });
              }
              if (window.jQuery && window.jQuery.fn && window.jQuery.fn.finalTilesGallery) {
                window.jQuery('.final-tiles-gallery').finalTilesGallery();
              }
              }

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initThe8);
              } else {
                initThe8();
              }
            })();
          `}
        </Script>
      </body>
    </html>
  );
};

export default Layouts;

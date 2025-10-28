import { Rubik, Monoton } from 'next/font/google'

const rubik = Rubik({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
})

const monoton = Monoton({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-monoton',
  display: 'swap',
})

import "@styles/css/plugins/bootstrap.min.css";
import "@styles/css/plugins/swiper.min.css";
import "@styles/css/plugins/font-awesome.min.css";

import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

import '@styles/scss/style.scss';
import "./globals.css";

import ScrollbarProgress from "@layouts/scrollbar-progress/Index";

import AppData from "@data/app.json";
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://ageless.rs'),
  title: {
		default: AppData.settings.siteName,
		template: "%s | " + AppData.settings.siteName,
	},
  description: AppData.settings.siteDescription,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://ageless.rs/',
    siteName: AppData.settings.siteName,
    title: AppData.settings.siteName,
    description: AppData.settings.siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: AppData.settings.siteName,
    description: AppData.settings.siteDescription,
  },
  robots: { index: true, follow: true },
}

const Layouts = ({
  children
}) => {
  return (
    <html lang="sr" className={`${rubik.variable} ${monoton.variable}`}>
      <head>
        <link rel="canonical" href="https://ageless.rs/" />
        <Script id="org-jsonld" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            name: "Aviva Ageless",
            url: "https://ageless.rs",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Bulevar Nemanjića 12",
              addressLocality: "Niš",
              addressCountry: "RS"
            }
          }) }} />
      </head>
      <body>
        {/* app wrapper */}
        <div className="sb-app">
          {children}

          <ScrollbarProgress />
        </div>
        {/* app wrapper end */}
      </body>
    </html>
  );
};
export default Layouts;

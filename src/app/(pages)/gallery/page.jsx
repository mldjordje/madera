import React from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";
import { fetchGalleryData } from "@library/gallery";

import PageBanner from "@components/PageBanner";
import CallToActionSection from "@components/sections/CallToAction";
import Link from "next/link";

const GalleryMasonry = dynamic(() => import("@components/gallery/GalleryMasonry"), { ssr: false });

export const metadata = {
  title: {
    default: "Gallery",
  },
  description: AppData.settings.siteDescription,
};

const Gallery1 = async () => {
  const { intro, categories } = await fetchGalleryData();
  const nonEmptyCategories = categories.filter((cat) => (cat.items || []).length > 0);
  const hasCategories = nonEmptyCategories.length > 0;

  return (
    <>
      <PageBanner
        pageTitle={intro?.title || "Galerija"}
        breadTitle={"Gallery"}
        description={intro?.description}
        type={1}
      />

      {/* gallery */}
      <div className="sb-p-90-60">
        <div className="container">
          {hasCategories ? nonEmptyCategories.map((category) => (
            <div className="sb-mb-60" key={category.slug}>
              <div className="sb-main-title-frame sb-mb-30">
                <div className="sb-main-title">
                  <span className="sb-suptitle sb-mb-15">Galerija</span>
                  <h2 className="sb-mb-10">{category.title}</h2>
                  {category.description && <p className="sb-text">{category.description}</p>}
                  <Link href={`/gallery/${category.slug}`} className="sb-btn sb-btn-2 sb-mt-15">
                    <span className="sb-icon">
                      <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                    </span>
                    <span>Otvori kategoriju</span>
                  </Link>
                </div>
              </div>

              <GalleryMasonry items={category.items} layout={1} />
            </div>
          )) : (
            <div className="sb-main-title sb-mb-30">
              <h3>Galerija uskoro</h3>
              <p className="sb-text">Još uvek nema unetih kategorija ili slika.</p>
            </div>
          )}
        </div>
      </div>
      {/* gallery end */}

      <CallToActionSection />
    </>
  );
};
export default Gallery1;

import React from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";
import { fetchGalleryData } from "@library/gallery";
import PageBanner from "@components/PageBanner";

const GalleryMasonry = dynamic(() => import("@components/gallery/GalleryMasonry"), { ssr: false });

export const metadata = {
  title: {
    default: "Galerija",
  },
  description: AppData.settings.siteDescription,
};

const GalleryCategoryPage = async ({ params }) => {
  const { slug } = params;
  const { categories } = await fetchGalleryData();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return notFound();
  }

  return (
    <>
      <PageBanner
        pageTitle={category.title}
        breadTitle={"Gallery"}
        description={category.description}
        type={1}
      />
      <div className="sb-p-90-60">
        <div className="container">
          <div className="sb-main-title-frame sb-mb-30">
            <div className="sb-main-title">
              <span className="sb-suptitle sb-mb-15">Galerija</span>
              <h2 className="sb-mb-10">{category.title}</h2>
              {category.description && <p className="sb-text">{category.description}</p>}
            </div>
          </div>
          <GalleryMasonry items={category.items} layout={1} />
        </div>
      </div>
    </>
  );
};

export default GalleryCategoryPage;


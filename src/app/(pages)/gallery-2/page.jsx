import React from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";
import GalleryData from "@data/gallery.json";

import PageBanner from "@components/PageBanner";
import CallToActionTwoSection from "@components/sections/CallToActionTwo";

const GalleryMasonry = dynamic( () => import("@components/gallery/GalleryMasonry"), { ssr: false } );

export const metadata = {
  title: {
		default: "Gallery 2",
	},
  description: AppData.settings.siteDescription,
}

const Gallery2 = () => {
  return (
    <>
      <PageBanner pageTitle={"It’s a pity that the photo <br>does not convey the taste!"} breadTitle={"Gallery"} description={"Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi."} type={2} />
      
      {/* gallery */}
      <div className="sb-p-90-60">
        <div className="container">
          <GalleryMasonry items={GalleryData.items} layout={2} />

          <div>
            <ul className="sb-pagination">
              <li className="sb-active"><a href="#.">1</a></li>
              <li><a href="#.">2</a></li>
              <li><a href="#.">3</a></li>
              <li><a href="#.">4</a></li>
              <li><a href="#.">...</a></li>
            </ul>
          </div>
        </div>
        
      </div>
      {/* gallery end */}

      <CallToActionTwoSection />
    </>
  );
};
export default Gallery2;
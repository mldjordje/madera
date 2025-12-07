"use client";

import { useEffect, useRef } from "react";
import Isotope from "isotope-layout";
import GalleryItem from "@components/gallery/GalleryItem";

const GalleryMasonry = ({ items, layout }) => {
    // Isotope
    const isotope = useRef();
    
    useEffect(() => {
        //setTimeout(() => {
            isotope.current = new Isotope(".sb-masonry-grid", {
                itemSelector: ".sb-grid-item",
                percentPosition: true,
                masonry: {
                    columnWidth: '.sb-grid-sizer'
                },
                transitionDuration: '0.5s',
            });
        //}, 500);
    }, []);

    return (
      <>
        <div className="sb-masonry-grid">
            <div className="sb-grid-sizer"></div>

            {items.map((item, key) => (
            <div className={layout == 1 ? "sb-grid-item sb-item-33" : "sb-grid-item sb-item-50"} key={`gallery-item-${key}`}>
              <GalleryItem item={item} index={key} marginBottom={30} />
            </div>
            ))}
        </div>
      </>
    );
};
export default GalleryMasonry;
  
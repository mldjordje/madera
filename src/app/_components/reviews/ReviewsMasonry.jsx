"use client";

import Isotope from "isotope-layout";
import { useEffect, useRef } from "react";

import ReviewItem from "@components/reviews/ReviewItem";

const ReviewsMasonry = ({ items }) => {
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
          <div className="sb-grid-item sb-item-50" key={`reviews-item-${key}`}>
            <ReviewItem item={item} index={key} marginBottom={60} />
          </div>
          ))}
        </div>
      </>
    );
};
export default ReviewsMasonry;
  
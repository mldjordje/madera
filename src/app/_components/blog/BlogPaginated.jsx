"use client";

import Isotope from "isotope-layout";
import { useEffect, useRef } from "react";

import BlogItem from "@components/blog/BlogItem";

const PaginatedBlogPosts = ({ items, columns }) => {
  // Isotope
  const isotope = useRef();
  const indexes = [1, 3, 4];

  useEffect(() => {
    isotope.current = new Isotope(".sb-masonry-grid", {
      itemSelector: '.sb-grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.sb-grid-sizer'
      }
    });
  }, []);

  var columnsClass = '';
  
  switch (columns) {
      case 2:
          columnsClass = 'sb-item-50';
      break;
      default:
          columnsClass = 'sb-item-33';
  }

  return (
    <>
      <div className="sb-masonry-grid">
        <div className="sb-grid-sizer" />

        {items.map((item, key) => (
        <div className={`sb-grid-item ${columnsClass}`} key={`blog-post-${key}`}>
          <BlogItem item={item} vertical={indexes.includes(key+1) ? 1 : 0} />
        </div>
        ))}
      </div>
    </>
  );
};
export default PaginatedBlogPosts;
  
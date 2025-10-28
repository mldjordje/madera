"use client";

import Isotope from "isotope-layout";
import { useEffect, useRef, useState } from "react";

const ProductTabs = ({items, active}) => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState(active);
  
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

  useEffect(() => {
      if (isotope.current) {
          filterKey === "*"
          ? isotope.current.arrange({ filter: `*` })
          : isotope.current.arrange({ filter: `.sb-${filterKey}-tab` });
      }
  }, [filterKey]);
  
  const handleFilterKeyChange = (key, e) => {
      e.preventDefault();
      setFilterKey(key);
      const filterLinks = document.querySelectorAll(".sb-filter a");
      filterLinks.forEach((filter) => {
          const filterValue = filter.getAttribute("data-filter");
          if (filterValue == 'sb-'+key+'-tab') {
              filter.classList.add("sb-active");
          } else {
              filter.classList.remove("sb-active");
          }
      });
  };

  return (
    <>   
      {/* filter */}
      <div className="sb-filter">
        {items.map((tab, key) => (
        <a href="#." data-filter={`sb-${tab.slug}-tab`} key={`product-tabs-item-${key}`} className={tab.slug == active ? "sb-filter-link sb-active" : "sb-filter-link"} onClick={(e) => handleFilterKeyChange(tab.slug, e)}>{tab.name}</a>
        ))}
      </div>
      {/* filter end */}
    </>
  );
};
export default ProductTabs;

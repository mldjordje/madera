"use client";

import Isotope from "isotope-layout";
import { useEffect, useRef } from "react";
import MenuItem from "@components/menu/MenuItem";

const MenuMasonry = ({ categories, noImage, columns }) => {
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

    var columnsClass = '';
  
    switch (columns) {
        case 3:
            columnsClass = 'sb-item-33';
        break;
        case 2:
            columnsClass = 'sb-item-50';
        break;
        default:
            columnsClass = 'sb-item-25';
    }

    return (
      <>
        <div className="sb-masonry-grid">
            <div className="sb-grid-sizer"></div>
            
            {categories.map((category, category_key) => (
            <div className={`sb-grid-item ${columnsClass} ${category.slug} sb-mb-30`} key={`menu-masonry-item-${category_key}`}>

                <div className="sb-mb-60">
                    <h2 className="sb-cate-title">{category.name}</h2>
                </div>
            
                {category.items.map((item, key) => (
                    <MenuItem item={item} index={key} key={key} noImage={noImage} marginBottom={30} />
                ))}
            </div>
            ))}

        </div>
      </>
    );
};
export default MenuMasonry;
  
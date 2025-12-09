"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const MenuItem = ({ item, index, noImage, marginBottom }) => {
  const stars = [ '', '', '', '', '' ];
  
  const [img, setImg] = useState(false);
  const [imgValue, setImgValue] = useState([]);
  const badgeLabel = item.badge?.toLowerCase().includes('vegan')
    ? 'Vegan'
    : item.badge?.toLowerCase().includes('hot')
    ? 'Začinjeno'
    : null;

  return (
    <>    
      <a
        data-fancybox="menu"
        data-no-swup
        href={item.image}
        className={`sb-menu-card sb-mb-${marginBottom}`}
        onClick={ (e) => { e.preventDefault(); setImg(true); setImgValue( [{ "src": item.image, "alt": item.title }] ); }}
      >
        {noImage != 1 && (
        <div className="sb-menu-card__media">
            <img src={item.image} alt={item.title} />
        </div>
        )}
        <div className="sb-menu-card__body">
            <div className="sb-menu-card__header">
                <h4 className="sb-card-title">{item.title}</h4>
                <span className="sb-price-badge">
                  {item.currency} {item.price}
                </span>
            </div>
            <p className="sb-text sb-mb-15">
                {item.text}
            </p>
            <div className="sb-menu-card__meta">
                {badgeLabel && <span className="sb-tag sb-tag-soft">{badgeLabel}</span>}
                {item.rating && (
                  <span className="sb-tag sb-tag-outline">★ {item.rating}</span>
                )}
            </div>
        </div>
      </a>
      
      <Lightbox
        open={img}
        close={() => setImg(false)}
        slides={imgValue}
        styles={{ container: { backgroundColor: "rgba(15, 38, 32, 0.55)" } }}
        render={{
          buttonPrev: imgValue.length <= 1 ? () => null : undefined,
          buttonNext: imgValue.length <= 1 ? () => null : undefined,
        }}
      />
    </>
  );
};
export default MenuItem;

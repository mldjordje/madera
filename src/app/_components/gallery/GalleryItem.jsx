"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const GalleryItem = ({ item, index, marginBottom }) => {  
  const [img, setImg] = useState(false);
  const [imgValue, setImgValue] = useState([]);

  return (
    <>
      <div className={`sb-gallery-item ${item.orientation != "h" ? "sb-gallery-vert" : ""} sb-mb-${marginBottom}`}>
        <img src={item.url} alt={item.alt} />

        {/* button */}
        <a data-fancybox="gallery" data-no-swup href={item.url} className="sb-btn sb-btn-2 sb-btn-icon sb-btn-gray sb-zoom" onClick={ (e) => { e.preventDefault(); setImg(true); setImgValue( [{ "src": item.url, "alt": item.alt }] ); }}>
            <span className="sb-icon">
                <img src="/img/ui/icons/zoom.svg" alt="icon" />
            </span>
        </a>
        {/* button end */}
      </div>
      
      <Lightbox
        open={img}
        close={() => setImg(false)}
        slides={imgValue}
        styles={{ container: { backgroundColor: "rgba(38, 31, 65, .85)" } }}
        render={{
          buttonPrev: imgValue.length <= 1 ? () => null : undefined,
          buttonNext: imgValue.length <= 1 ? () => null : undefined,
        }}
      />
    </>
  );
};
export default GalleryItem;

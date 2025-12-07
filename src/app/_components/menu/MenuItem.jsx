"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const MenuItem = ({ item, index, noImage, marginBottom }) => {
  const stars = [ '', '', '', '', '' ];
  
  const [img, setImg] = useState(false);
  const [imgValue, setImgValue] = useState([]);

  return (
    <>    
      <a data-fancybox="menu" data-no-swup href={item.image} className={`sb-menu-item sb-mb-${marginBottom}`} onClick={ (e) => { e.preventDefault(); setImg(true); setImgValue( [{ "src": item.image, "alt": item.title }] ); }}>
        {noImage != 1 &&
        <div className="sb-cover-frame">
            <img src={item.image} alt={item.title} />
            <div dangerouslySetInnerHTML={{__html : item.badge}} />
        </div>
        }
        <div className="sb-card-tp">
            <h4 className="sb-card-title">{item.title}</h4>
            <div className="sb-price"><sub>{item.currency}</sub> {item.price}</div>
        </div>
        <div className="sb-description">
            <p className="sb-text sb-mb-15">
                {item.text}
            </p>
            <ul className="sb-stars">
                {stars.slice(0, item.rating).map((star_item, star_key) => (
                <li key={`products-item-${index}-rating-star-${star_key}`}><i className="fas fa-star"></i></li>
                ))}
                <li><span>({item.rating} ratings)</span></li>
            </ul>
        </div>
      </a>
      
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
export default MenuItem;

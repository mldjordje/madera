"use client";

import { SliderProps } from "@common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

import Data from '@data/sliders/products';
import Link from "next/link";

import MenuItem from "@components/menu/MenuItem";

const FeaturedDishCard = ({ item }) => {
  const image = item.imageUrl || item.image;
  return (
    <article className="sb-featured-card sb-featured-card--light sb-soft-reveal">
      {image && (
        <div className="sb-featured-thumb">
          <img src={image} alt={item.title || "Izdvojeno jelo"} />
        </div>
      )}
      <div className="sb-featured-body">
        <div className="sb-featured-top">
          <div className="sb-featured-copy">
            <h4 className="sb-card-title sb-m-0">{item.title}</h4>
            {item.description && <p className="sb-text sb-m-0">{item.description}</p>}
          </div>
          {item.price && <span className="sb-price-badge">{item.price}</span>}
        </div>
      </div>
    </article>
  );
};

const ProductsSlider = ( {items, title, description, button = {}, slidesPerView, paddingTop = 0, bgType, itemType} ) => {
  const safeItems = Array.isArray(items) ? items : [];
  const limitedItems = slidesPerView == 4 ? safeItems.slice(0, 8) : safeItems.slice(0, 6);

  const renderItem = (item, key) => {
    if (itemType === "featured") {
      return <FeaturedDishCard item={item} />;
    }

    return <MenuItem item={item} index={key} marginBottom={0} />;
  };

  return (
    <>
    {/* short menu */}
    <section className={`sb-short-menu sb-short-menu--light sb-soft-reveal sb-p-${paddingTop}-90`}>
        {bgType == 2 ? (
        <div className="sb-bg-1" style={{"marginTop": "-120px"}}>
            <div></div>
        </div>
        ) : (
        <div className="sb-bg-2">
            <div></div>
        </div>
        )}
        <div className="container">
            <div className="sb-group-title sb-mb-30">
            <div className="sb-left sb-mb-30">
                <h2 className="sb-mb-30" dangerouslySetInnerHTML={{__html : title ? title : Data.title}} />
                <p className="sb-text" dangerouslySetInnerHTML={{__html : description ? description : Data.description}} />
            </div>
            <div className="sb-right sb-mb-30">
                {/* slider navigation */}
                <div className="sb-slider-nav">
                    <div className="sb-prev-btn sb-short-menu-prev"><i className="fas fa-arrow-left"></i></div>
                    <div className="sb-next-btn sb-short-menu-next"><i className="fas fa-arrow-right"></i></div>
                </div>
                {/* slider navigation end */}
                {/* button */}
                {button != 0 &&
                <Link href={button.link ? button.link : Data.button.link} className="sb-btn">
                    <span className="sb-icon">
                        <img src={button.icon ? button.icon : Data.button.icon} alt="icon" />
                    </span>
                    <span>{button.label ? button.label : Data.button.label}</span>
                </Link>
                }
                {/* button end */}
            </div>
            </div>

            {slidesPerView == 4 ? (
            <Swiper
                {...SliderProps.shortMenuSlider4}
                className={`swiper-container sb-short-menu-slider-4i`}
            >
                {limitedItems.map((item, key) => (
                <SwiperSlide className="swiper-slide" key={`products-slider-item-${key}`}>
                    {renderItem(item, key)}
                </SwiperSlide>
                ))}
            </Swiper>

            ) : (

            <Swiper
                {...SliderProps.shortMenuSlider3}
                className={`swiper-container sb-short-menu-slider-3i`}
            >
                {limitedItems.map((item, key) => (
                <SwiperSlide className="swiper-slide" key={`products-slider-item-${key}`}>
                    {renderItem(item, key)}
                </SwiperSlide>
                ))}
            </Swiper>

            )}
        </div>
    </section>
    {/* short menu end */}
    </>
  );
};
export default ProductsSlider;

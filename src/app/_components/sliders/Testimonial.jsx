"use client";

import { SliderProps } from "@common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

import Data from '@data/sliders/testimonial';
import Link from "next/link";

import { useEffect } from "react";
import { ScrollAnimation } from "@common/scrollAnims";

const TestimonialSlider = () => {
  useEffect(() => {
    ScrollAnimation();
  }, []);

  const stars = [ '', '', '', '', '' ];

  return (
    <>
      {/* revievs */}
      <section className="sb-reviews sb-p-0-90">
        <div className="container">
          <div className="sb-group-title sb-mb-30">
            <div className="sb-left sb-mb-30">
              <h2 className="sb-mb-30" dangerouslySetInnerHTML={{__html : Data.title}} />
              <p className="sb-text" dangerouslySetInnerHTML={{__html : Data.description}} />
            </div>
            <div className="sb-right sb-mb-30">
              {/* slider navigation */}
              <div className="sb-slider-nav">
                <div className="sb-prev-btn sb-reviews-prev"><i className="fas fa-arrow-left"></i></div>
                <div className="sb-next-btn sb-reviews-next"><i className="fas fa-arrow-right"></i></div>
              </div>
              {/* slider navigation end */}
              {/* button */}
              <Link href={Data.button.link} className="sb-btn">
                <span className="sb-icon">
                  <img src={Data.button.icon} alt="icon" />
                </span>
                <span>{Data.button.label}</span>
              </Link>
              {/* button end */}
            </div>
          </div>
          <Swiper
            {...SliderProps.reviewsSlider}
            className="swiper-container sb-reviews-slider"
          >
              {Data.items.map((item, key) => (
              <SwiperSlide className="swiper-slide" key={`testimonial-slider-item-${key}`}>
              <div className="sb-review-card">
                <div className="sb-review-header sb-mb-15">
                  <h4 className="sb-mb-15">{item.title}</h4>
                  <ul className="sb-stars">
                    {stars.slice(0, item.rating).map((star_item, star_key) => (
                    <li key={`testimonial-item-${key}-rating-star-${star_key}`}><i className="fas fa-star"></i></li>
                    ))}
                  </ul>
                </div>
                <p className="sb-text sb-mb-15">{item.text}</p>
                <div className="sb-author-frame">
                  <div className="sb-avatar-frame">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <h4>{item.name}</h4>
                </div>
              </div>
            </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* revievs end */}
    </>
  );
};
export default TestimonialSlider;

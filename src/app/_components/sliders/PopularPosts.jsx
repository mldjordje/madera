"use client";

import { SliderProps } from "@common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

import BlogItem from "@components/blog/BlogItem";

import Data from "@data/sliders/popular-posts.json";

const PopularPostsSlider = ( { posts } ) => {
    
    return (
        <>
            {/* popular */}
            <section className="sb-popular sb-p-60-30">
                <div className="sb-bg-3" />

                <div className="container">
                    <div className="sb-group-title sb-mb-30">
                        <div className="sb-left sb-mb-30">
                            <h2 className="sb-mb-30" dangerouslySetInnerHTML={{__html : Data.title}} />
                            <p className="sb-text" dangerouslySetInnerHTML={{__html : Data.description}} />
                        </div>
                        <div className="sb-right sb-mb-30">
                            {/* slider navigation */}
                            <div className="sb-slider-nav">
                                <div className="sb-prev-btn sb-blog-prev"><i className="fas fa-arrow-left" /></div>
                                <div className="sb-next-btn sb-blog-next"><i className="fas fa-arrow-right" /></div>
                            </div>
                            {/* slider navigation end */}
                        </div>
                    </div>

                    <Swiper
                        {...SliderProps.blogSlider3}
                        className={`swiper-container sb-blog-slider-3i`}
                    >
                        {posts.map((item, key) => (
                        <SwiperSlide className="swiper-slide" key={`blog-popular-slider-item-${key}`}>
                            <BlogItem item={item} popular={1} />
                        </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </section>
            {/* popular end */}
        </>
    );
};

export default PopularPostsSlider;
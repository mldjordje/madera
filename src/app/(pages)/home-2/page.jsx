import React from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";
import Products from '@data/products';

import HeroSection from "@components/sections/Hero";
import AboutTwoSection from "@components/sections/AboutTwo";
import FeaturesOneSection from "@components/sections/Features";
import CallToActionTwoSection from "@components/sections/CallToActionTwo";

const ProductsSlider = dynamic( () => import("@components/sliders/Products"), { ssr: false } );
const TestimonialSlider = dynamic( () => import("@components/sliders/Testimonial"), { ssr: false } );

export const metadata = {
  title: {
		default: "Home 2",
	},
  description: AppData.settings.siteDescription,
}

const Home2 = () => {
  return (
    <>
      <HeroSection type={2} />
      <AboutTwoSection />
      <FeaturesOneSection />
      <ProductsSlider items={Products.collection['popular']} slidesPerView={3} />
      <TestimonialSlider />
      <CallToActionTwoSection />
    </>
  );
};
export default Home2;
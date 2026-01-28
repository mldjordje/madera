import React from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";
import Products from '@data/products';

import HeroSection from "@components/sections/Hero"
import AboutSection from "@components/sections/About";
import CategoriesSection from "@components/sections/Categories";
import CallToActionSection from "@components/sections/CallToAction";

const ProductsSlider = dynamic( () => import("@components/sliders/Products"), { ssr: false } );

export const metadata = {
  title: {
		default: "Home",
		template: "%s | " + AppData.settings.siteName,
	},
  description: AppData.settings.siteDescription,
}

async function Home1() {
  const fallbackFeatured = (Products.collection['popular'] || []).map((item, idx) => ({
    id: `fallback-${idx}`,
    title: item.title,
    description: item.text,
    imageUrl: item.image,
    price: item.price ? `${item.price} ${item.currency || ""}`.trim() : "",
  }));

  const sliderItems = fallbackFeatured;

  return (
    <>
      <HeroSection type={1} />
      <AboutSection />
      <CategoriesSection />
      <ProductsSlider items={sliderItems} itemType="featured" slidesPerView={4} />
      <CallToActionSection />
    </>
  );
};
export default Home1;

import React from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";
import Products from '@data/products';

import PageBanner from "@components/PageBanner";
import TeamSection from "@components/sections/Team";
import CategoriesSection from "@components/sections/Categories";
import CallToActionTwoSection from "@components/sections/CallToActionTwo";
import CallToActionThreeSection from "@components/sections/CallToActionThree";

const ProductsSlider = dynamic( () => import("@components/sliders/Products"), { ssr: false } );

export const metadata = {
  title: {
		default: "Shop 2",
	},
  description: AppData.settings.siteDescription,
}

const Shop2 = () => {
  return (
    <>
      <PageBanner pageTitle={"Taste the dishes of the restaurant without leaving home."} description={"Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi."} breadTitle={"Shop"} type={2} />
      <CategoriesSection heading={0} paddingTop={90} type={2} columns={4} />
      <ProductsSlider 
        items={Products.collection['popular']} 
        title={'Most <span>popular</span> dishes'} 
        description={'Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi.'} 
        button={ {"link": "/products", "label": "View all", "icon": '/img/ui/icons/arrow.svg'} }
        slidesPerView={3}
        itemType={'product'} 
      />
      <CallToActionThreeSection />
      <ProductsSlider 
        items={Products.collection['bestseller']} 
        title={'Our <span>Bestsellers</span>'} 
        description={'Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi.'} 
        button={ {"link": "/products-2", "label": "View all", "icon": '/img/ui/icons/arrow.svg'} }
        slidesPerView={3} 
        paddingTop={90}
        bgType={2}
        itemType={'product'}
      />
      <TeamSection items={3} />
      <CallToActionTwoSection />
    </>
  );
};
export default Shop2;
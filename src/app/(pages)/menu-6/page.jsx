import React from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";
import MenuData from "@data/menu.json";

import PageBanner from "@components/PageBanner";
import PromoSection from "@components/sections/Promo";

const MenuFiltered = dynamic( () => import("@components/menu/MenuFiltered"), { ssr: false } );

export const metadata = {
  title: {
		default: "Menu 6",
	},
  description: AppData.settings.siteDescription,
}

const Menu6 = () => {
  return (
    <>
      <PageBanner pageTitle={"Starbelly menu."} breadTitle={"Menu"} type={1} />
      
      {/* menu section 1 */}
      <section className="sb-menu-section sb-p-90-60">
        <div className="sb-bg-1">
          <div></div>
        </div>
        <div className="container">
          <MenuFiltered categories={MenuData.categories} noImage={1} columns={2} />
        </div>
      </section>
      {/* menu end */}

      <PromoSection />
    </>
  );
};
export default Menu6;
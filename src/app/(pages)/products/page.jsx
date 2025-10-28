import React from "react";

import AppData from "@data/app.json";
import ProductsData from "@data/products.json";

import PageBanner from "@components/PageBanner";
import ProductsGrid from "@components/products/ProductsGrid";
import PromoSection from "@components/sections/Promo";

export const metadata = {
  title: {
		default: "Products",
	},
  description: AppData.settings.siteDescription,
}

const Products = () => {
  return (
    <>
      <PageBanner pageTitle={"Main dishes"} breadTitle={"Main dishes"} type={1} />

      {/* shop list */}
      <section className="sb-menu-section sb-p-90-60">
        <div className="sb-bg-1">
          <div />
        </div>
        <div className="container">
          <ProductsGrid items={ProductsData.items} />

          <div>
            <ul className="sb-pagination">
              <li className="sb-active"><a href="#.">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">...</a></li>
            </ul>
          </div>
        </div>
      </section>
      {/* shop list end */}

      <PromoSection />
    </>
  );
};
export default Products;
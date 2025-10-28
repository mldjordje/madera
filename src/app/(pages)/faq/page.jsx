import React from "react";

import AppData from "@data/app.json";
import FaqData from "@data/faq.json";

import PageBanner from "@components/PageBanner";
import FaqGrid from "@components/faq/FaqGrid";
import CallToActionSection from "@components/sections/CallToAction";

export const metadata = {
  title: {
		default: "FAQ",
	},
  description: AppData.settings.siteDescription,
}

const FAQ = () => {
  return (
    <>
      <PageBanner pageTitle={"Frequently Asked Questions."} breadTitle={"FAQ"} type={1} />
      
      {/* faq */}
      {FaqData.categories.map((category, category_key) => (
      <section className={category_key == 0 ? "sb-p-90-0" : "sb-p-90-90"} key={`faq-category-${category_key}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sb-mb-90">
                <h2 className="sb-cate-title">{category.name}</h2>
              </div>
            </div>

            <FaqGrid items={category.items} categoryKey={category_key} />
          </div>
        </div>
      </section>
      ))}
      {/* faq end */}

      <CallToActionSection />
    </>
  );
};
export default FAQ;
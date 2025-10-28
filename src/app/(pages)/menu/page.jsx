import React from "react";

import AppData from "@data/app.json";
import MenuData from "@data/menu.json";

import PageBanner from "@components/PageBanner";
import MenuGrid from "@components/menu/MenuGrid";
import PromoSection from "@components/sections/Promo";

export const metadata = {
  title: {
		default: "Menu",
	},
  description: AppData.settings.siteDescription,
}

const Menu1 = () => {
  return (
    <>
      <PageBanner pageTitle={"Starbelly menu."} breadTitle={"Menu"} type={1} />
      
      {/* menu section 1 */}
      <section className="sb-menu-section sb-p-90-60">
        <div className="sb-bg-1">
          <div></div>
        </div>
        <div className="container">
          <div className="sb-mb-60">
            <h2 className="sb-cate-title sb-mb-15">{MenuData.categories[0].name}</h2>
            <p className="sb-text" dangerouslySetInnerHTML={{__html : MenuData.categories[0].description}} />
          </div>

          <MenuGrid items={MenuData.categories[0].items} />
        </div>
      </section>
      {/* menu section 1 end */}

      {/* menu section 2 */}
      <section className="sb-menu-section sb-p-0-60">
        <div className="sb-bg-2">
          <div></div>
        </div>
        <div className="container">
          <div className="sb-mb-60">
            <h2 className="sb-cate-title sb-mb-15">{MenuData.categories[1].name}</h2>
            <p className="sb-text" dangerouslySetInnerHTML={{__html : MenuData.categories[1].description}} />
          </div>

          <MenuGrid items={MenuData.categories[1].items} />
        </div>
      </section>
      {/* menu section 2 end */}

      {/* menu section 3 */}
      <section className="sb-menu-section sb-p-0-60">
        <div className="sb-bg-1">
          <div></div>
        </div>
        <div className="container">
          <div className="sb-mb-60">
            <h2 className="sb-cate-title sb-mb-15">{MenuData.categories[2].name}</h2>
            <p className="sb-text" dangerouslySetInnerHTML={{__html : MenuData.categories[2].description}} />
          </div>

          <MenuGrid items={MenuData.categories[2].items} />
        </div>
      </section>
      {/* menu section 3 end */}

      {/* menu section 4 */}
      <section className="sb-menu-section sb-p-0-60">
        <div className="container">
          <div className="sb-mb-60">
            <h2 className="sb-cate-title sb-mb-15">{MenuData.categories[3].name}</h2>
            <p className="sb-text" dangerouslySetInnerHTML={{__html : MenuData.categories[3].description}} />
          </div>

          <MenuGrid items={MenuData.categories[3].items} />
        </div>
      </section>
      {/* menu section 4 end */}

      <PromoSection />
    </>
  );
};
export default Menu1;
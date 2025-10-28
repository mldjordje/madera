import React from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";
import ReviewsData from "@data/reviews.json";

import PageBanner from "@components/PageBanner";
import CallToActionSection from "@components/sections/CallToAction";

const ReviewsMasonry = dynamic( () => import("@components/reviews/ReviewsMasonry"), { ssr: false } );

export const metadata = {
  title: {
		default: "Reviews",
	},
  description: AppData.settings.siteDescription,
}

const Reviews1 = () => {
  return (
    <>
      <PageBanner pageTitle={"Feedback from our guests."} breadTitle={"Reviews"} type={1} />
      
      {/* reviews */}
      <section className="sb-reviews sb-p-90-90">
        <div className="sb-bg-2" style={{"marginTop": "190px"}}>
          <div></div>
        </div>
        <div className="container">
          <ReviewsMasonry items={ReviewsData.items} />

          <div>
            <ul className="sb-pagination sb-mt-0">
              <li className="sb-active"><a href="#.">1</a></li>
              <li><a href="#.">2</a></li>
              <li><a href="#.">3</a></li>
              <li><a href="#.">4</a></li>
              <li><a href="#.">...</a></li>
            </ul>
          </div>
        </div>
      </section>
      {/* reviews end */}

      <CallToActionSection />
    </>
  );
};
export default Reviews1;
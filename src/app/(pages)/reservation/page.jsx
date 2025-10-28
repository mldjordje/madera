import React from "react";

import AppData from "@data/app.json";

import Link from "next/link";

import ContactInfoSection from "@components/sections/ContactInfo";
import ContactMapSection from "@components/sections/ContactMap";
import ReservationForm from "@components/forms/ReservationForm";

export const metadata = {
  title: {
		default: "Reservation",
	},
  description: AppData.settings.siteDescription,
}

const Reservation = () => {
  return (
    <>
      {/* banner */}
      <section className="sb-banner sb-banner-color">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              {/* main title */}
              <div className="sb-main-title-frame">
                <div className="sb-main-title">
                  <span className="sb-suptitle sb-mb-30">Reservation</span>
                  <h1 className="sb-mb-30">Mmm...! <br/>Your evening <br/>will be great!</h1>
                  <p className="sb-text sb-text-lg sb-mb-30">Consectetur numquam poro nemo veniam<br/>eligendi rem adipisci quo modi.</p>

                  <ul className="sb-breadcrumbs">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                  </ul>
                </div>
              </div>
              {/* main title end */}
            </div>
            <div className="col-lg-5">
              <div className="sb-contact-form-frame">
                <div className="sb-illustration-9">
                  <img src="/img/illustrations/reservation.png" alt="envelope" className="sb-envelope-1" />

                  <div className="sb-cirkle-1"></div>
                  <div className="sb-cirkle-2"></div>
                  <div className="sb-cirkle-3"></div>
                </div>
                <div className="sb-form-content">
                  <div className="sb-main-content">
                    <h3 className="sb-mb-30">Reservation details</h3>
                    
                    <ReservationForm />
                  </div>
                  <div className="sb-success-result" id="reservationFormStatus">
                    <img src="/img/ui/success.jpg" alt="success" className="sb-mb-15" />
                    <div className="sb-success-title sb-mb-15">Success!</div>
                    <p className="sb-text sb-mb-15">Your message has been sent <br/>successfully</p>
                    
                    {/* button */}
                    <Link href="/" className="sb-btn sb-btn-2">
                      <span className="sb-icon">
                        <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                      </span>
                      <span>Back to home</span>
                    </Link>
                    {/* button end */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* banner end */}

      <ContactInfoSection />

      <ContactMapSection />
    </>
  );
};
export default Reservation;
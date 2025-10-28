import React from "react";

import AppData from "@data/app.json";
import CartData from "@data/cart.json";

import PageBanner from "@components/PageBanner";
import CheckoutForm from "@components/forms/CheckoutForm";

import Link from "next/link";

export const metadata = {
  title: {
		default: "Order checkout",
	},
  description: AppData.settings.siteDescription,
}

const Checkout = () => {
  return (
    <>
      <PageBanner pageTitle={"Checkout"} breadTitle={"Checkout"} type={1} />

      {/* checkout */}
      <section className="sb-p-90-90">
        <div className="container" data-sticky-container>
          <div className="row">
            <div className="col-lg-8">
              <CheckoutForm />
            </div>
            <div className="col-lg-4">
              <div className="sb-pad-type-2 sb-sticky" data-margin-top="120">
                <div className="sb-co-cart-frame">
                  <div className="sb-cart-table">
                    <div className="sb-cart-table-header">
                      <div className="row">
                        <div className="col-lg-9">Product</div>
                        <div className="col-lg-3 text-right">Total</div>
                      </div>
                    </div>

                    {CartData.items.map((item, key) => (
                    <div className="sb-cart-item">
                      <div className="row align-items-center">
                        <div className="col-lg-9">
                          <Link className="sb-product" href="/product">
                            <div className="sb-cover-frame">
                              <img src={item.image} alt={item.title} />
                            </div>
                            <div className="sb-prod-description">
                              <h4 className="sb-mb-10">{item.title}</h4>
                              <p className="sb-text sb-text-sm">x{item.quantity}</p>
                            </div>
                          </Link>
                        </div>
                        <div className="col-lg-3 text-md-right">
                          <div className="sb-price-2"><span>Total: </span>{item.currency}{item.price}</div>
                        </div>
                      </div>
                    </div>
                    ))}

                    <div className="sb-cart-total sb-cart-total-2">
                      <div className="sb-sum">
                        <div className="row">
                          <div className="col-6">
                            <div className="sb-total-title">Subtotal:</div>
                          </div>
                          <div className="col-6">
                            <div className="sb-price-1 text-right">$32.99</div>
                          </div>
                        </div>
                      </div>
                      <div className="sb-realy-sum">
                        <div className="row">
                          <div className="col-6">
                            <div className="sb-total-title">Total:</div>
                          </div>
                          <div className="col-6">
                            <div className="sb-price-2 text-right">$37.99</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* checkout end */}
    </>
  );
};
export default Checkout;
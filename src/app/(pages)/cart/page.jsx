import React from "react";

import AppData from "@data/app.json";
import CartData from "@data/cart.json";

import PageBanner from "@components/PageBanner";
import CartItem from "@components/products/CartItem"

import Link from "next/link";

export const metadata = {
  title: {
		default: "Shopping Cart",
	},
  description: AppData.settings.siteDescription,
}

const Cart = () => {
  return (
    <>
      <PageBanner pageTitle={"Your order."} breadTitle={"Cart"} type={1} />

      {/* cart */}
      <section className="sb-p-90-90">
        <div className="container">
          <div className="sb-cart-table">
            <div className="sb-cart-table-header">
              <div className="row">
                <div className="col-lg-6">Product</div>
                <div className="col-lg-3">Quantity</div>
                <div className="col-lg-1">Price</div>
                <div className="col-lg-1">Total</div>
                <div className="col-lg-1"></div>
              </div>
            </div>

            {CartData.items.map((item, key) => (
            <CartItem item={item} key={key} />
            ))}

            <div className="row justify-content-end">
              <div className="col-lg-6">
                <div className="sb-cart-total">
                  <div className="sb-sum">
                    <div className="row">
                      <div className="col-8">
                        <div className="sb-total-title">Subtotal:</div>
                      </div>
                      <div className="col-4">
                        <div className="sb-price-1 text-right">$32.99</div>
                      </div>
                    </div>
                  </div>
                  <div className="sb-sum">
                    <div className="row">
                      <div className="col-8">
                        <div className="sb-total-title">Estimated shipping:</div>
                      </div>
                      <div className="col-4">
                        <div className="sb-price-1 text-right">$5</div>
                      </div>
                    </div>
                  </div>
                  <div className="sb-realy-sum">
                    <div className="row">
                      <div className="col-8">
                        <div className="sb-total-title">Total:</div>
                      </div>
                      <div className="col-4">
                        <div className="sb-price-2 text-right">$37.99</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sb-cart-btns-frame text-right">
                  {/* button */}
                  <Link href="/shop" className="sb-btn sb-btn-2 sb-btn-gray">
                    <span className="sb-icon">
                      <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                    </span>
                    <span>Continue shopping</span>
                  </Link>
                  {/* button end */}
                  {/* button */}
                  <Link href="/checkout" className="sb-btn sb-m-0">
                    <span className="sb-icon">
                      <img src="/img/ui/icons/arrow.svg" alt="icon" />
                    </span>
                    <span>Checkout</span>
                  </Link>
                  {/* button end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* cart end */}
    </>
  );
};
export default Cart;
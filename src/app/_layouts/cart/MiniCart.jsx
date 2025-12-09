"use client";

import CartData from "@data/cart.json";
import Link from "next/link";

const MiniCart = () => {
    return (
        <>
            <div className="sb-minicart-content">
                <div className="sb-ib-title-frame sb-mb-30">
                    <h4>Your order.</h4>
                    <i className="fas fa-arrow-down" />
                </div>
                {CartData.items.map((item, key) => (
                <Link href="/product" className="sb-menu-card sb-menu-card--mini sb-mb-15" key={`mini-cart-item-${key}`}>
                    <div className="sb-menu-card__media sb-menu-card__media--mini">
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className="sb-menu-card__body sb-menu-card__body--mini">
                        <div className="sb-menu-card__header">
                            <h4 className="sb-card-title">{item.title}</h4>
                            <span className="sb-price-badge">
                                {item.currency} {item.price}
                            </span>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
            <div className="sb-minicart-footer">
                {/* button */}
                <Link href="/cart" className="sb-btn sb-btn-gray sb-btn-text">
                    <span>View order</span>
                </Link>
                {/* button end */}
                {/* button */}
                <Link href="/checkout" className="sb-btn sb-btn-text">
                    <span>Checkout</span>
                </Link>
                {/* button end */}
            </div>
        </>
    );
};
export default MiniCart;

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import CartData from "@data/cart.json";

const CartItem = ({ item, key }) => {
  const [cartTotal, setCartTotal] = useState(CartData.total);
  const [quantity, setQuantity] = useState(item.quantity);
  const [total, setTotal] = useState((item.price*item.quantity).toFixed(2));
  const minQuantity = 1;
  const maxQuantity = 10;

  useEffect(() => {
    const cartNumberEl = document.querySelector('.sb-cart-number');
    cartNumberEl.innerHTML = cartTotal;
  }, [cartTotal]);

  useEffect(() => {
    setTotal((quantity*item.price).toFixed(2));
  }, [quantity]);

  const removeFromCart = (e, key) => {
    e.preventDefault();
    const cartNumberEl = document.querySelector('.sb-cart-number');
    setCartTotal(cartTotal - quantity);

    cartNumberEl.classList.add('sb-added');
    
    setTimeout(() => {
        cartNumberEl.classList.remove('sb-added');
        document.querySelector('.sb-cart-item-'+key).remove();
    }, 600);
  }
  
  return (
    <>   
      <div className={`sb-cart-item sb-cart-item-${key}`}>
        <div className="row align-items-center">
            <div className="col-lg-6">
                <Link className="sb-product" href={`/product`}>
                    <div className="sb-cover-frame">
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className="sb-prod-description">
                        <h4 className="media-heading sb-mb-10"></h4>
                        <p className="sb-text sb-text-sm">{item.description}</p>
                    </div>
                </Link>
            </div>
            <div className="col-6 col-lg-3">
                <div className="sb-input-number-frame">
                    <div className="sb-input-number-btn sb-sub" onClick={() => setQuantity(quantity>minQuantity ? quantity-1 : quantity)}>-</div>
                    <input type="number" value={quantity} readOnly />
                    <div className="sb-input-number-btn sb-add" onClick={() => setQuantity(quantity<maxQuantity ? quantity+1 : quantity)}>+</div>
                </div>
            </div>
            <div className="col-3 col-lg-1">
                <div className="sb-price-1"><span>Price: </span>{item.currency}{item.price}</div>
            </div>
            <div className="col-3 col-lg-1">
                <div className="sb-price-2"><span>Total: </span>{item.currency}{total}</div>
            </div>
            <div className="col-1">
                <a href="#." className="sb-remove" onClick={(e) => removeFromCart(e, key) }>+</a>
            </div>
        </div>
      </div>
    </>
  );
};
export default CartItem;
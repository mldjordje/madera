"use client";

import { useEffect, useState } from "react";

const FaqItem = ({ item, key, categoryKey }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <li key={`faq-category-${categoryKey}-item-${key}`} className={toggle ? "sb-active" : ""}>
        <div className="sb-question" onClick={() => setToggle(!toggle)}>
            <h4>{item.title}</h4>
            <span className={`sb-plus-minus-toggle ${!toggle ? "sb-collapsed" : ""}`}></span>
        </div>
        <div className="sb-answer sb-text" dangerouslySetInnerHTML={{__html : item.text }} />
    </li>
  );
};
export default FaqItem;
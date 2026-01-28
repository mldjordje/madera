"use client";

import Sticky from "sticky-js";

export const ScrollAnimation = () => {
    // sticky
    const sticky = new Sticky('.sb-sticky');
    if ( window.innerWidth < 992 ) {
        sticky.destroy();
    }

    // top panel
    const topPanel = document.querySelector('.sb-top-bar-frame');
    const infoBar = document.querySelector('.sb-info-bar');

    if ( topPanel ) {
        window.addEventListener("scroll", (e) => {
            if( window.scrollY > 10 ) {
                topPanel.classList.add('sb-scroll');
                infoBar?.classList.add('sb-scroll');
            } else {
                topPanel.classList.remove('sb-scroll');
                infoBar?.classList.remove('sb-scroll');
            }
        });
    }
}

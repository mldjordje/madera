'use client';

import { useEffect } from "react";
import { CursorAnimation } from "@common/cursorAnims";

const ScrollbarProgressModule = () => {
    useEffect(() => {
        CursorAnimation();
    }, []);

    return (
        <>
            {/* click effect */}
            <div className="sb-click-effect"></div>
            {/* loader */}
            
            <div className="sb-load"></div>
        </>
    );
};
export default ScrollbarProgressModule;
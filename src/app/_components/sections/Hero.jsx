"use client";

import Data from "@data/sections/hero-1.json";
import Link from "next/link";

import { useEffect } from "react";
import { ScrollAnimation } from "@common/scrollAnims";

const Hero = ( { type } ) => {
    useEffect(() => {
        ScrollAnimation();
    }, []);

    return (
        <>
            {/* banner */}
            <section className="sb-banner">
                {/* mobile video background (YouTube) */}
                <div className="sb-hero-mobile-video" aria-hidden="true">
                    <iframe
                        className="sb-hero-video"
                        src="https://www.youtube.com/embed/05MQ4uFPUAA?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=05MQ4uFPUAA&playsinline=1&modestbranding=1&iv_load_policy=3"
                        title="Madera hero background"
                        frameBorder="0"
                        allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                        allowFullScreen={false}
                    />
                </div>
                <div className="sb-bg-1">
                <div></div>
                </div>
                <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                    {/* main title */}
                    <div className="sb-main-title-frame">
                        <div className="sb-main-title">
                        <span className="sb-suptitle sb-mb-30">{Data.subtitle}</span>
                        <h1 className="sb-mb-30" dangerouslySetInnerHTML={{__html : Data.title}} />
                        <p className="sb-text sb-text-lg sb-mb-30" dangerouslySetInnerHTML={{__html : Data.description}} />

                        {/* button */}
                        <Link href={Data.button1.link} className="sb-btn">
                            <span className="sb-icon">
                                <img src={Data.button1.icon} alt="icon" />
                            </span>
                            <span>{Data.button1.label}</span>
                        </Link>
                        {/* button end */}
                        {/* button */}
                        <Link href={Data.button2.link} className="sb-btn sb-btn-2 sb-btn-gray">
                            <span className="sb-icon">
                                <img src={Data.button2.icon} alt="icon" />
                            </span>
                            <span>{Data.button2.label}</span>
                        </Link>
                        {/* button end */}

                        </div>
                    </div>
                    {/* main title end */}
                    </div>
                    {/* desktop side image */}
                    <div className="col-lg-6 d-none d-lg-block">
                        <div className="sb-hero-image-frame">
                            <img src={Data.image.url || '/img/1.jpg'} alt={Data.image.alt || 'Madera'} />
                        </div>
                    </div>
                </div>
                </div>
            </section>
            {/* banner end */}
        </>
    );
}
export default Hero;

"use client";

import Data from "@data/sections/about.json";

const AboutSection = () => {
    return (
        <>
            {/* features */}
            <section className="sb-p-60-0">
                <div className="container">
                <div className="row flex-md-row-reverse">
                    <div className="col-lg-6 align-self-center sb-mb-30">
                    <h2 className="sb-mb-60" dangerouslySetInnerHTML={{__html : Data.title}} />

                    <ul className="sb-features">
                        {Data.items.map((item, key) => (
                        <li className="sb-features-item sb-mb-60" key={`about-list-item-${key}`}>
                        <div className="sb-number">{item.num}</div>
                        <div className="sb-feature-text">
                            <h3 className="sb-mb-15">{item.title}</h3>
                            <p className="sb-text">{item.text}</p>
                        </div>
                        </li>
                        ))}
                    </ul>
                    </div>
                    <div className="col-lg-6 align-self-center">
                    <div className="sb-illustration-2 sb-mb-90">
                        <div className="sb-interior-frame">
                            <img src={Data.image.url} alt={Data.image.alt} className="sb-interior" />
                        </div>

                        <div className="sb-square"></div>
                        <div className="sb-cirkle-1"></div>
                        <div className="sb-cirkle-2"></div>
                        <div className="sb-cirkle-3"></div>
                        <div className="sb-cirkle-4"></div>

                        <div className="sb-experience">
                        <div className="sb-exp-content">
                            <p className="sb-h1 sb-mb-10">{Data.number.value}</p>
                            <p className="sb-h3">{Data.number.label}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            {/* features end */}
        </>
    );
};

export default AboutSection;
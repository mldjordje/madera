import Data from "@data/sections/promo.json";
import Link from "next/link";

const PromoSection = () => {
  return (
    <>
        {/* promo */}
        <section className="sb-p-0-60">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="sb-promo-frame sb-mb-30">
                            <div className="sb-promo-content">
                                <div className="sb-text-frame">
                                    <h3 className="sb-mb-10"><sup>{Data.banner1.title_before}</sup> <b className="sb-h2">{Data.banner1.title}</b> <sup>{Data.banner1.title_after}</sup></h3>
                                    <h3 className="sb-mb-15">{Data.banner1.subtitle}</h3>
                                    <p className="sb-text sb-text-sm sb-mb-15">{Data.banner1.text}</p>
                                    {/* button */}
                                    <Link href={Data.banner1.button.link} className="sb-btn sb-ppc">
                                        <span className="sb-icon">
                                            <img src="/img/ui/icons/arrow.svg" alt="icon" />
                                        </span>
                                        <span>{Data.banner1.button.label}</span>
                                    </Link>
                                    {/* button end */}
                                </div>
                                <div className="sb-image-frame">
                                    <div className="sb-illustration-4">
                                        <img src={Data.banner1.image.url} alt={Data.banner1.image.alt} className="sb-burger" />

                                        <div className="sb-cirkle-1"></div>
                                        <div className="sb-cirkle-2"></div>
                                        <div className="sb-cirkle-3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="sb-promo-frame sb-mb-30">
                            <div className="sb-promo-content">
                                <div className="sb-text-frame">
                                    <h3 className="sb-mb-15">{Data.banner2.subtitle}</h3>
                                    <h3 className="sb-mb-10"><b className="sb-h2">{Data.banner2.title}</b></h3>
                                    <p className="sb-text sb-text-sm sb-mb-15">{Data.banner2.text}</p>
                                    {/* button */}
                                    <Link href={Data.banner2.button.link} className="sb-btn sb-ppc">
                                        <span className="sb-icon">
                                            <img src="/img/ui/icons/arrow.svg" alt="icon" />
                                        </span>
                                        <span>{Data.banner2.button.label}</span>
                                    </Link>
                                    {/* button end */}
                                </div>
                                <div className="sb-image-frame">
                                    <div className="sb-illustration-5">
                                        <img src={Data.banner2.image.url} alt={Data.banner2.image.alt} className="sb-cup" />
                                        
                                        <div className="sb-cirkle-1"></div>
                                        <div className="sb-cirkle-2"></div>
                                        <div className="sb-cirkle-3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
};

export default PromoSection;
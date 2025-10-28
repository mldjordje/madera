import Data from "@data/sections/call-to-action-3.json";
import Link from "next/link";

const CallToActionThreeSection = ( { bg } ) => {
  return (
    <>
         {/* call to action */}
        <section className="sb-call-to-action">
            <div className="sb-bg-3"></div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-6 align-self-center">
                        <div className="sb-cta-text">
                            <h1 className="sb-mb-15" dangerouslySetInnerHTML={{__html : Data.title}} />
                            <p className="sb-text sb-mb-30" dangerouslySetInnerHTML={{__html : Data.description}} />

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
                    <div className="col-lg-6">
                        <div className="sb-illustration-6">
                            <img src={Data.image.url} alt={Data.image.alt} className="sb-burger" />

                            <div className="sb-cirkle-1"></div>
                            <div className="sb-cirkle-2"></div>
                            <div className="sb-cirkle-3"></div>
                            <div className="sb-cirkle-4"></div>
                            <div className="sb-cirkle-5"></div>

                            <img src="/img/illustrations/2.svg" alt="phones" className="sb-pik-2" />
                            <img src="/img/illustrations/3.svg" alt="phones" className="sb-pik-3" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* call to action end */}
    </>
  );
};

export default CallToActionThreeSection;
import Data from "@data/sections/call-to-action.json";

const CallToActionSection = ( { bg } ) => {
  return (
    <>
        {/* call to action */}
        <section className="sb-call-to-action">
            <div className="sb-bg-3"></div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-6 align-self-center">
                        <div className="sb-cta-text">
                            <h2 className="sb-h1 sb-mb-30" dangerouslySetInnerHTML={{__html : Data.title}} />
                            <p className="sb-text sb-mb-30" dangerouslySetInnerHTML={{__html : Data.subtitle}} />

                            <a href={Data.link1.url} target="_blank" title={Data.link1.title} data-no-swup className="sb-download-btn"><img src="/img/buttons/1.svg" alt="img" /></a>
                            <a href={Data.link2.url} target="_blank" title={Data.link2.title} data-no-swup className="sb-download-btn"><img src="/img/buttons/2.svg" alt="img" /></a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="sb-illustration-3">
                            <img src={Data.image.url} alt={Data.image.alt} className="sb-phones" />

                            <div className="sb-cirkle-1"></div>
                            <div className="sb-cirkle-2"></div>
                            <div className="sb-cirkle-3"></div>
                            <div className="sb-cirkle-4"></div>

                            <img src="/img/illustrations/1.svg" alt="phones" className="sb-pik-1" />
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

export default CallToActionSection;
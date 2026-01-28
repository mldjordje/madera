import Data from "@data/sections/call-to-action.json";

const CallToActionSection = ( { bg } ) => {
  return (
    <>
        {/* call to action */}
        <section className="sb-call-to-action sb-call-to-action--light sb-soft-reveal">
          <div className="container">
            <div className="sb-cta-card">
              <div className="row align-items-center">
                <div className="col-lg-6 align-self-center">
                  <div className="sb-cta-text">
                    <h2 className="sb-h1 sb-mb-20" dangerouslySetInnerHTML={{__html : Data.title}} />
                    <p className="sb-text sb-mb-25" dangerouslySetInnerHTML={{__html : Data.subtitle}} />

                    <div className="sb-cta-actions sb-mb-20">
                      <a href={Data.link1.url} title={Data.link1.title} className="sb-btn">
                        <span className="sb-icon">
                          <img src="/img/ui/icons/arrow.svg" alt="arrow" />
                        </span>
                        <span>{Data.link1.title}</span>
                      </a>
                      <a href={Data.link2.url} title={Data.link2.title} className="sb-btn sb-btn-2 sb-btn-gray">
                        <span className="sb-icon">
                          <img src="/img/ui/icons/menu.svg" alt="contact" />
                        </span>
                        <span>{Data.link2.title}</span>
                      </a>
                    </div>

                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="sb-cta-image">
                    <img src={Data.image.url} alt={Data.image.alt} />
                  </div>
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

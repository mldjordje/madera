import Data from "@data/sections/about-2.json";

const AboutTwoSection = () => {
    return (
        <>
            {/* About text */}
            <section className="sb-about-text sb-p-90-0">
                <div className="sb-bg-1" style={{"marginTop": "90px"}}>
                    <div></div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 align-self-center">
                            <div className="sb-illustration-2 sb-mb-90">
                                <div className="sb-interior-frame">
                                    <img src={Data.image.url} alt={Data.image.alt} className="sb-interior" style={{"objectPosition": "center"}} />
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
                        <div className="col-lg-6 align-self-center sb-mb-60">
                            <h2 className="sb-mb-60" dangerouslySetInnerHTML={{__html : Data.title}} />
                            <div className="sb-text sb-mb-30" dangerouslySetInnerHTML={{__html : Data.description}} />
                            <img src={Data.signature} alt="Signature" className="sb-signature sb-mb-30" />
                        </div>
                    </div>
                </div>
            </section>
            {/* About text end */}
        </>
    );
};

export default AboutTwoSection;
import Data from "@data/sections/features.json";

const FeaturesOneSection = () => {
  return (
    <>
        {/* features */}
        <section className="sb-features sb-p-0-30">
            <div className="container">
                <div className="row">
                    {Data.items.map((item, key) => (
                    <div className="col-lg-4" key={`features-item-${key}`}>
                        <div className="sb-features-item sb-mb-60">
                            <div className="sb-number">{item.num}</div>
                            <div className="sb-feature-text">
                                <h3 className="sb-mb-15">{item.title}</h3>
                                <p className="sb-text" dangerouslySetInnerHTML={{__html : item.text}} />
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
        {/* features end */}
    </>
  );
};

export default FeaturesOneSection;
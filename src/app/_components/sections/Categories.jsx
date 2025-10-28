import Data from "@data/sections/categories.json";
import Link from "next/link";

const CategoriesSection = ({ heading = 1, paddingTop = 0, type = 1, columns }) => {
  var columnsClass = '';

  switch (columns) {
    case 4:
        columnsClass = 'col-lg-3';
    break;
    case 3:
        columnsClass = 'col-lg-4';
    break;
    default:
        columnsClass = 'col-lg-6';
  }

  return (
    <>
        {/* categories */}
        <section className={`sb-p-${paddingTop}-60`}>
            <div className="container">
                {heading == 1 &&
                <div className="sb-group-title sb-mb-30">
                    <div className="sb-left sb-mb-30">
                        <h2 className="sb-mb-30" dangerouslySetInnerHTML={{__html : Data.title}} />
                        <p className="sb-text" dangerouslySetInnerHTML={{__html : Data.description}} />
                    </div>

                    <div className="sb-right sb-mb-30">
                    {/* button */}
                    <Link href={Data.button.link} className="sb-btn sb-m-0">
                        <span className="sb-icon">
                            <img src="/img/ui/icons/arrow.svg" alt="icon" /> 
                        </span>
                        <span>{Data.button.label}</span>
                    </Link>
                    {/* button end */}
                    </div>
                </div>
                }
                <div className="row">
                    {Data.items.map((item, key) => (
                    <div className={columnsClass} key={`categories-item-${key}`}>
                        <a href={item.link} className={type == 1 ? "sb-categorie-card sb-categorie-card-2 sb-mb-30" : "sb-categorie-card sb-mb-30"}>
                            <div className="sb-card-body">
                            <div className="sb-category-icon">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="sb-card-descr">
                                <h3 className="sb-mb-10">{item.title}</h3>
                                <p className="sb-text">{item.text}</p>
                            </div>
                            </div>
                        </a>
                    </div>
                    ))}
                </div>
            </div>
        </section>
        {/* categories end */}
    </>
  );
};

export default CategoriesSection;
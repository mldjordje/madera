import Data from "@data/sections/team.json";
import Link from "next/link";

const TeamSection = ( { items } ) => {
  if ( items == undefined ) {
    items = 4;
  }

  return (
    <>
        {/* team */}
        <section className="sb-p-0-60">
            <div className="container">
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
            <div className="row">
                {Data.items.slice(0, items).map((item, key) => (
                <div className={items == 3 ? "col-lg-4" : "col-lg-3"} key={`team-item-${key}`}>
                <div className="sb-team-member sb-mb-30">
                    <div className="sb-photo-frame sb-mb-15">
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className="sb-member-description">
                    <h4 className="sb-mb-10">{item.name}</h4>
                    <p className="sb-text sb-text-sm sb-mb-10">{item.role}</p>
                    <ul className="sb-social">
                        {item.social.map((social_item, social_key) => (
                        <li key={`team-item-${key}-social-${social_key}`}><a href={social_item.url} target="_blank" title={social_item.title}><i className={social_item.icon}></i></a></li>
                        ))}
                    </ul>
                    </div>
                </div>
                </div>
                ))}
            </div>
            </div>
        </section>
        {/* team end */}
    </>
  );
};

export default TeamSection;
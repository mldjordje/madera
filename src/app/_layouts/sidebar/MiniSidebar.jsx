import AppData from "@data/app.json";
import Link from "next/link";

import PostsData from "@data/.json/posts";

const MiniSidebar = () => {
    return (
        <>
            <div className="sb-infobar-content">
                <div className="sb-ib-title-frame sb-mb-30">
                    <h4>Contact</h4><i className="fas fa-arrow-down"></i>
                </div>
                <ul className="sb-list sb-mb-30">
                    <li><b>Address:</b><span>Montréal, 1510 Rue Sauvé</span></li>
                    <li><b>Working hours:</b><span>09:00 - 23:00</span></li>
                    <li><b>Phone:</b><span>+02 (044) 756-X6-52</span></li>
                    <li><b>Email:</b><span>starbelly@mail.com</span></li>
                </ul>
                <div className="sb-ib-title-frame sb-mb-30">
                    <h4>Instagram</h4><i className="fas fa-arrow-down"></i>
                </div>
                <ul className="sb-instagram sb-mb-30">
                    {AppData.instagram.map((item, key) => (
                    <li key={`mini-sidebar-inst-item-${key}`}><a href={item.link} target="_blank"><img src={item.image} alt={item.title} /></a></li>
                    ))}
                </ul>
                <hr />
                <div className="sb-ib-title-frame sb-mb-30">
                    <h4>Latest publications</h4><i className="fas fa-arrow-down"></i>
                </div>
                {PostsData.slice(0, 3).map((item, key) => (
                <Link href={`/blog/${item.id}`} className="sb-blog-card sb-blog-card-sm sb-mb-30" key={`mini-sidebar-posts-item-${key}`}>
                    <div className="sb-cover-frame">
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className="sb-blog-card-descr">
                        <h5 className="sb-mb-5">{item.title}</h5>
                        <p className="sb-text sb-text-sm">{item.short}</p>
                    </div>
                </Link>
                ))}
            </div>
            <div className="sb-info-bar-footer">
                <ul className="sb-social">
                    {AppData.social.map((item, key) => (
                    <li key={`mini-sidebar-social-item-${key}`}><a href={item.link} target="_blank" title={item.title}><i className={item.icon}></i></a></li>
                    ))}
                </ul>
            </div>
        </>
    );
};
export default MiniSidebar;
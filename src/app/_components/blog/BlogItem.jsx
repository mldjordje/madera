"use client";

import Link from "next/link";
import Date from '@library/date';

const BlogItem = ({ item, vertical, popular }) => {
  return (
    <>
      <Link href={`/blog/${item.id}`} className="sb-blog-card sb-mb-30">
        <div className={vertical ? "sb-cover-frame sb-cover-vert sb-mb-30" : "sb-cover-frame sb-mb-30"}>
            <img src={item.image} alt={item.title} />
            {popular == 1 &&
            <div className="sb-badge">Popular</div>
            }
        </div>
        <div className="sb-blog-card-descr">
            <h3 className="sb-mb-10">{item.title}</h3>
            <div className="sb-suptitle sb-mb-15">
            <span><Date dateString={item.date} /></span>
            <span>&nbsp;|&nbsp;{item.author}</span>
            </div>
            <p className="sb-text">{item.short}</p>
        </div>
      </Link>
    </>
  );
};
export default BlogItem;
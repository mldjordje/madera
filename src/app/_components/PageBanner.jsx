"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import { useEffect } from "react";
import { ScrollAnimation } from "@common/scrollAnims";

const PageBanner = ({ pageTitle, breadTitle, description, type }) => {
  const asPath = usePathname();

  let clearBreadTitle;

  if ( breadTitle != undefined ) {
    clearBreadTitle = breadTitle;
  } else {
    const regex = /(<([^>]+)>)/gi;
    clearBreadTitle = pageTitle ? pageTitle.replace(regex, "") : "";
  }

  if ( pageTitle == 'Search: %s' ) {
    const searchParams = useSearchParams();
    const query = searchParams.get('key');
    
    pageTitle = 'Search: '+query;
  }
  
  useEffect(() => {
    ScrollAnimation();
  }, []);
  
  return (
    <>    
      {/* banner */}
      <section className={type == 2 ? "sb-banner sb-banner-sm sb-banner-color" : "sb-banner sb-banner-xs sb-banner-color"}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* main title */}
              <div className="sb-main-title-frame">
                <div className={type == 2 ? "sb-main-title text-center" : "sb-main-title"}>
                  {type == 2 &&
                  <span className="sb-suptitle sb-mb-30" dangerouslySetInnerHTML={{__html : clearBreadTitle}} />
                  }
                  <h1 className={type == 2 ? "sb-h1 sb-mb-30" : "sb-h2"} dangerouslySetInnerHTML={{__html : pageTitle}} />
                  {type == 2 &&
                  <p className="sb-text sb-text-lg sb-mb-30" dangerouslySetInnerHTML={{__html : description}} />
                  }
                  <ul className="sb-breadcrumbs">
                    <li><Link href="/">Home</Link></li>
                    {asPath.indexOf('/blog/') != -1 && asPath.indexOf('/blog/page/') == -1 &&
                    <li>
                      <Link href="/blog">Blog</Link>
                    </li>
                    }
                    {asPath.indexOf('/products') != -1 || asPath.indexOf('/cart') != -1 || asPath.indexOf('/checkout') != -1 &&
                    <li>
                      <Link href="/shop">Shop</Link>
                    </li>
                    }
                    {asPath.endsWith('/product') == 1 &&
                    <li>
                      <Link href="/products">Products</Link>
                    </li>
                    }
                    <li><a dangerouslySetInnerHTML={{__html : clearBreadTitle}} /></li>
                  </ul>
                </div>
              </div>
              {/* main title end */}
            </div>
          </div>
        </div>
      </section>
      {/* banner end */}
    </>
  );
};
export default PageBanner;

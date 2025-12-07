import React from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";
import ProductsData from "@data/products.json";

import PageBanner from "@components/PageBanner";
import ReviewItem from "@components/reviews/ReviewItem";
import ProductImage from "@components/products/ProductImage";
import ProductButtons from "@components/products/ProductButtons";
import CallToActionTwoSection from "@components/sections/CallToActionTwo";

const ProductsSlider = dynamic( () => import("@components/sliders/Products"), { ssr: false } );
const ProductTabs = dynamic( () => import("@components/products/ProductTabs"), { ssr: false } );

export const metadata = {
  title: {
		default: "Product page",
	},
  description: AppData.settings.siteDescription,
}

const Products = () => {
  async function ProductAtts() {
    const AttsData = [
      {
        "label": "Numquam",
        "value": "1 pack"
      },
      {
        "label": "Cupiditate",
        "value": "150g"
      },
      {
        "label": "Adipisicing",
        "value": "500g"
      },
      {
        "label": "Dolorem obcaecati",
        "value": "3 Teaspoon"
      },
      {
        "label": "Porro",
        "value": "2 pack"
      },
      {
        "label": "Facilis",
        "value": "1kg"
      },
      {
        "label": "Goluptatem",
        "value": "1 Teaspoon"
      },
      {
        "label": "Vel fuga",
        "value": "300g"
      }
    ];

    return (
      <>
        <ul className="sb-list">
          {AttsData.map((item, key) => (
          <li key={`product-reviews-item-${key}`}><b>{item.label}</b><span>{item.value}</span></li>
          ))}
        </ul>
      </>
    );
  };

  async function ProductDescription() {
    return (
      <>
        <div className="sb-text">
          <p>Facilis ratione veritatis asperiores doloremque molestiae delectus iure officia earum dolores sit fugiat, repellendus, neque laboriosam optio culpa quibusdam, magnam totam quos. Mollitia dolorem, culpa, dignissimos quas et voluptates architecto in sit totam, quae animi ratione adipisci nulla ab quasi perferendis quo pariatur dolor magnam inventore. Sequi nisi ex excepturi non harum, asperiores laboriosam ipsum voluptate doloribus incidunt nam eveniet similique unde esse voluptatem minus necessitatibus eaque temporibus quaerat accusantium amet deserunt. Iste, facilis? Illo tenetur, libero, non dicta asperiores quisquam voluptas natus aperiam, at perspiciatis repellat voluptate. Autem non reprehenderit, perferendis.</p>
          <p>Consectetur adipisicing elit. Delectus quibusdam repellendus nesciunt cumque fugit numquam adipisci voluptatum quam, sapiente doloribus ut eaque natus laudantium alias illum quos maiores, quia perferendis.</p>
        </div>
      </>
    );
  };

  async function ProductReviews() {
    const ReviewsData = [
      {
        "title": "Very tasty",
        "name": "Emma Newman",
        "rating": 5,
        "image": "/img/faces/1.jpg",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis fugiat totam nobis quas unde excepturi inventore possimus laudantium provident, rem eligendi velit. Aut molestias, ipsa itaque laborum, natus tempora, ut soluta animi ducimus dignissimos deserunt doloribus in reprehenderit rem accusamus! Quibusdam labore, aliquam dolor harum!"
      },
      {
        "title": "I have lunch here every day",
        "name": "Paul Trueman",
        "rating": 5,
        "image": "/img/faces/2.jpg",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis fugiat totam nobis quas unde excepturi inventore possimus laudantium provident, rem eligendi velit. Aut molestias, ipsa itaque laborum, natus tempora, ut soluta animi ducimus dignissimos deserunt doloribus in reprehenderit rem accusamus! Quibusdam labore, aliquam dolor harum!"
      }
    ];
    
    return (
        <div className="row">
          {ReviewsData.map((item, key) => (
          <div className="col-lg-6" key={`product-reviews-item-${key}`}>
            <ReviewItem item={item} key={key} marginBottom={60} />
          </div>
          ))}
        </div>
    );
  };

  const tabs = [
    {
      "slug": "ingredients",
      "name": "Ingredients"
    },
    {
      "slug": "details",
      "name": "Product details"
    },
    {
      "slug": "reviews",
      "name": "Reviews"
    }
  ];

  return (
    <>
      <PageBanner pageTitle={"Product Detail"} breadTitle={"Product Detail"} type={1} />

      {/* product */}
      <section className="sb-p-90-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <ProductImage src={"/img/menu/4.jpg"} alt={"Saumon Gravlax"} badge={"<div class='sb-badge sb-vegan'><i class='fas fa-leaf'></i> Vegan</div>"} />
            </div>
            <div className="col-lg-6">
              <div className="sb-product-description sb-mb-90">
                <div className="sb-price-frame sb-mb-30">
                  <h3>Saumon Gravlax</h3>
                  <div className="sb-price"><sub>$</sub> 19</div>
                </div>
                <ul className="sb-stars sb-mb-25">
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><span>(4 ratings)</span></li>
                </ul>
                <p className="sb-text sb-mb-30"><span>tomatoes</span>, <span>nori</span>, <span>feta cheese</span>, <span>mushrooms</span>, <span>rice noodles</span>, <span>corn</span>, <span>shrimp</span>.</p>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="sb-features-item sb-features-item-sm sb-mb-30">
                      <div className="sb-number">01</div>
                      <div className="sb-feature-text">
                        <h4 className="sb-mb-15">Add to the cart and place an order</h4>
                        <p className="sb-text sb-text-sm">Porro comirton pera nemo veniam</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="sb-features-item sb-features-item-sm sb-mb-30">
                      <div className="sb-number">02</div>
                      <div className="sb-feature-text">
                        <h4 className="sb-mb-15">Enter your phone number and address</h4>
                        <p className="sb-text sb-text-sm">Eligendi adipisci numquam.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="sb-features-item sb-features-item-sm sb-mb-30">
                      <div className="sb-number">03</div>
                      <div className="sb-feature-text">
                        <h4 className="sb-mb-15">Enjoy your favorite food at home!</h4>
                        <p className="sb-text sb-text-sm">Nnecessitatibus praesentium</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <ProductButtons />
              </div>
            </div>
          </div>

          <ProductTabs 
            items={tabs}
            active={"ingredients"}
          />

          <div className="sb-masonry-grid sb-tabs">
            <div className="sb-grid-sizer" />
            
            {tabs.map((tab, key) => (
            <div className={`sb-grid-item sb-${tab.slug}-tab`} key={`product-tab-${key}`}>
              <div className="sb-tab">
                {tab.slug == 'ingredients' && <ProductAtts />}
                {tab.slug == 'details' && <ProductDescription />}
                {tab.slug == 'reviews' && <ProductReviews />}
              </div>
            </div>
            ))}
          </div>

        </div>
      </section>
      {/* product end */}

      <ProductsSlider 
        items={ProductsData.items} 
        title={'It is usually bought together with this product'} 
        description={'Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi.'} 
        button={0}
        slidesPerView={4}
        itemType={'product'} 
      />

      <CallToActionTwoSection />
    </>
  );
};
export default Products;
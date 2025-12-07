import dynamic from "next/dynamic";
import { notFound } from 'next/navigation';

import PageBanner from "@components/PageBanner";
import Sidebar from "@components/Sidebar";
import PopularPosts from "@components/sliders/PopularPosts";

import { getAllAuthorsIds, getAuthorData } from "@library/authors";
import { getAuthorPosts, getFeaturedPostsData } from "@library/posts";

import PopularsPostsData from "@data/sliders/popular-posts.json";

const BlogPaginated = dynamic( () => import("@components/blog/BlogPaginated"), { ssr: false } );

export async function generateMetadata({ params }) {
  const authorData = await getSingleAuthorData(params);
  
  return {
    title: authorData.title + " | Author | Blog",
  }
}

async function BlogAuthor( { params } ) {
  const populars = await getAllPupulars();
  const posts = await getAllPosts(params);
  const authorData = await getSingleAuthorData(params);

  return (
    <>
      <PageBanner pageTitle={"Author: "+authorData.title} breadTitle={authorData.title} />
      
      {/* blog list */}
      <section className="sb-blog-list sb-p-90-90">
        <div className="sb-bg-1">
          <div></div>
        </div>
        <div className="container" data-sticky-container>
          <div className="row">
            <div className="col-lg-8">
          
              <div className="sb-mb-60">
                <h2 className="sb-cate-title sb-mb-30">Latest <span>publications</span></h2>
                <p className="sb-text">Consectetur numquam poro nemo veniam<br/>eligendi rem adipisci quo modi.</p>
              </div>

              <BlogPaginated
                items={posts}
                columns={2}
              />
            </div>
            <div className="col-lg-4">
              <div className="sb-sidebar-frame sb-pad-type-1 sb-sticky" data-margin-top="120">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* blog list end */}

      <PopularPosts posts={populars} />
    </>
  );
};
export default BlogAuthor;

export async function generateStaticParams() {
    const paths = getAllAuthorsIds()
    return paths
}

async function getAllPupulars() {
    const popularsData = await getFeaturedPostsData( PopularsPostsData.featured )
  
    return popularsData
}

async function getSingleAuthorData(params) {
    const authorData = await getAuthorData(params.id)

    if ( !authorData ) {
        notFound()
    } else {
        return authorData
    }
}

async function getAllPosts( params ) {
    const authorPosts = await getAuthorPosts(params.id)

    if (!authorPosts.length) {
        notFound()
    }

    return authorPosts
}
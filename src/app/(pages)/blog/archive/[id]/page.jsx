import dynamic from "next/dynamic";
import { notFound } from 'next/navigation';

import PageBanner from "@components/PageBanner";
import Sidebar from "@components/Sidebar";
import PopularPosts from "@components/sliders/PopularPosts";

import { getAllArchivesIds, getArchiveData } from "@library/archives";
import { getArchivePosts, getFeaturedPostsData } from "@library/posts";

import PopularsPostsData from "@data/sliders/popular-posts.json";

const BlogPaginated = dynamic( () => import("@components/blog/BlogPaginated"), { ssr: false } );

export async function generateMetadata({ params }) {
  const archiveData = await getSingleArchiveData(params);
  
  return {
    title: archiveData.month+', '+archiveData.year + " | Archive | Blog",
  }
}

async function BlogArchive( { params } ) {
  const populars = await getAllPupulars();
  const posts = await getAllPosts(params);
  const archiveData = await getSingleArchiveData(params);

  return (
    <>
      <PageBanner pageTitle={"Archive: "+archiveData.month+', '+archiveData.year} breadTitle={archiveData.month+', '+archiveData.year} />
      
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
export default BlogArchive;

export async function _generateStaticParams() {
    const paths = getAllArchivesIds()
    return paths
}

async function getAllPupulars() {
    const popularsData = await getFeaturedPostsData( PopularsPostsData.featured )
  
    return popularsData
}

async function getSingleArchiveData(params) {
    const archiveData = await getArchiveData(params.id)

    if ( !archiveData ) {
        notFound()
    } else {
        return archiveData
    }
}

async function getAllPosts( params ) {
    const archivePosts = await getArchivePosts(params.id)

    if (!archivePosts.length) {
        notFound()
    }

    return archivePosts
}
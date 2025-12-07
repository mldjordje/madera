import dynamic from "next/dynamic";
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation';

import AppData from "@data/app.json";
import PopularsPostsData from "@data/sliders/popular-posts.json";

import Pagination from '@components/Pagination';
import PageBanner from "@components/PageBanner";
import PopularPosts from "@components/sliders/PopularPosts";

import { getPaginatedPostsData, getFeaturedPostsData } from "@library/posts";

const BlogPaginated = dynamic( () => import("@components/blog/BlogPaginated"), { ssr: false } );

export const metadata = {
  title: {
		default: "Blog",
	},
  description: AppData.settings.siteDescription,
}

async function BlogPage( { params } ) {
  const populars = await getAllPupulars();
  const postsData = await getAllPosts(params);

  return (
    <>
      <PageBanner pageTitle={"Our Blog"} breadTitle={"Blog"} />

      {/* blog list */}
      <section className="sb-blog-list sb-p-90-90">
        <div className="sb-bg-1">
          <div></div>
        </div>
        <div className="container">
          <div className="sb-mb-60">
            <h2 className="sb-cate-title sb-mb-30">Latest <span>publications</span></h2>
            <p className="sb-text">Consectetur numquam poro nemo veniam<br/>eligendi rem adipisci quo modi.</p>
          </div>

          <BlogPaginated
            items={postsData.posts}
          />

          <div>
            <Pagination
              currentPage={postsData.currentPage}
              totalItems={postsData.totalPosts}
              perPage={AppData.settings.perPage}
              renderPageLink={(page) => `/blog/page/${page}`}
            />
          </div>
        </div>
      </section>
      {/* blog list end */}

      <PopularPosts posts={populars} />
    </>
  );
};
export default BlogPage;

export async function generateStaticParams() {
  return Array.from({ length: 5 }).map((_, i) => `/blog/page/${i + 2}`)
}

async function getAllPupulars() {
  const popularsData = await getFeaturedPostsData( PopularsPostsData.featured )

  return popularsData
}

async function getAllPosts( params ) {
  const page = Number(params?.page) || 1
  const { posts, total } = getPaginatedPostsData( AppData.settings.perPage, page );

  if (!posts.length) {
    notFound()
  }

  if (page === 1) {
    redirect('/blog')
  }

  return {
    posts: posts,
    totalPosts: total,
    currentPage: page
  }
}
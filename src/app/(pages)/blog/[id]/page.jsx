import { getAllPostsIds, getPostData, getFeaturedPostsData } from "@library/posts";
import { getAuthorData } from "@library/authors";

import Date from '@library/date';

import { notFound } from 'next/navigation';

import PageBanner from "@components/PageBanner";
import PopularPosts from "@components/sliders/PopularPosts";
import Sidebar from "@components/Sidebar";

import PopularsPostsData from "@data/sliders/popular-posts.json";

async function PostsDetail( { params } ) {
  const populars = await getAllPupulars();
  const postData = await getSinglePostData(params);
  const authorData = await getSingleAuthorData(postData.author.toLowerCase().replace(' ', '-'));

  return (
    <>
      <PageBanner pageTitle={postData.title} breadTitle={postData.categories[0]} type={postData.introLayout} />
      
      {/* publication */}
      <section className="sb-publication sb-p-90-90">
        <div className="container" data-sticky-container>
          <div className={postData.postLayout == 2 ? "row justify-content-center" : "row"}>
            <div className="col-lg-8">
              <div className="sb-author-panel">
                <div className="sb-author-frame">
                  <div className="sb-avatar-frame">
                    <img src={authorData.avatar} alt={postData.author} />
                  </div>
                  <h4>{postData.author}</h4>
                </div>
                <div className="sb-suptitle"><span><Date dateString={postData.date} /></span></div>
              </div>
              <div className="sb-post-cover sb-mb-30"><img src={postData.image} alt={postData.title} /></div>
              
              <div className="sb-text" dangerouslySetInnerHTML={{__html : postData.contentHtml}} />
            </div>
            {postData.postLayout !== 2 &&
            <div className="col-lg-4">
              <div className="sb-sidebar-frame sb-pad-type-2 sb-sticky" data-margin-top="120">
                {typeof postData.details !== undefined && postData.postLayout !== 3 &&
                <div className="sb-sidebar">
                  <h3 className="sb-mb-30">{postData.details?.title}</h3>
                  <ul className="sb-list">
                    {postData.details?.items.map((item, key) => (
                    <li key={`blog-details-item-${key}`}><b>{item.label}</b><span>{item.value}</span></li>
                    ))}
                  </ul>
                </div>
                }
                {postData.postLayout == 3 &&
                <Sidebar />
                }
              </div>
            </div>
            }
          </div>
        </div>
      </section>
      {/* publication end */}

      <PopularPosts posts={populars} />
    </>
  );
};
export default PostsDetail;

export async function generateStaticParams() {
  const paths = getAllPostsIds()

  return paths
}

async function getAllPupulars() {
    const popularsData = await getFeaturedPostsData( PopularsPostsData.featured )
  
    return popularsData
}

async function getSinglePostData(params) {
  const postData = await getPostData(params.id)
  
  if ( !postData ) {
    notFound()
  } else {
    return postData
  }
}

async function getSingleAuthorData(author_id) {
    const authorData = await getAuthorData(author_id)
    
    return authorData
}
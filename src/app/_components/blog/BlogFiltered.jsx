import { useSearchParams } from 'next/navigation'

import BlogItem from "@components/blog/BlogItem";

async function FilteredBlogPosts( { items, columns } ) {
    const searchParams = useSearchParams()
    const query = searchParams.get('key')

    let searchResults = items.filter((post) => {
        if (post.title.includes(query)) {
            return post;
        } else if (post.tags.includes(query)) {
            return post;
        } else if (post.categories.includes(query)) {
            return post;
        } else if (post.short.includes(query)) {
            return post;
        } else if (post.content.includes(query)) {
            return post;
        }
    });

    var columnsClass = '';
  
    switch (columns) {
        case 2:
            columnsClass = 'sb-item-50';
        break;
        default:
            columnsClass = 'sb-item-33';
    }

    return (
        <>
            { searchResults.length > 0 &&
                <>
                    <div className="sb-masonry-grid">
                        <div className="sb-grid-sizer" />

                        {searchResults.map((item, key) => (
                        <div className={`sb-grid-item ${columnsClass}`} key={`blog-post-${key}`}>
                            <BlogItem item={item} />
                        </div>
                        ))}
                    </div>                    
                </>
            }
        </>
    );
};
export default FilteredBlogPosts;
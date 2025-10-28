import Link from "next/link";
import usePagination from '@library/usePagination.js'

export const dotts = '...'

const Pagination = ({ currentPage, totalItems, perPage, renderPageLink }) => {
    const pages = usePagination(totalItems, currentPage, perPage)

    return (
        <>
        {/* pagination */}
        <ul className="sb-pagination">
            {pages.map((pageNumber, i) =>
                pageNumber === dotts ? (
                <li key={`pagination-item-${i}`}>
                    <span className="sb-pagination-text">
                        {pageNumber}
                    </span>
                </li>
                ) : (
                <li key={`pagination-item-${i}`} className={`${pageNumber === currentPage ? 'sb-active' : ''}`}>
                    <Link href={renderPageLink(pageNumber)}>
                        {pageNumber}
                    </Link>
                </li>
                )
            )}
        </ul>
        {/* pagination end */}
        </>
    );
  };
  export default Pagination;
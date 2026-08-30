import style from './Pagination.module.css'

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    totalResults?: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
}

export const Pagination = ({
                               currentPage,
                               totalPages,
                               totalResults,
                               onPageChange,
                               disabled = false,
                           }: PaginationProps) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }

    return (
        <div className={style.pagination}>
            <button
                className={style.paginationButton}
                onClick={handlePrevPage}
                disabled={disabled || currentPage === 1}
                aria-label="Previous page"
            >
                ◀ Previous
            </button>

            <span className={style.paginationText}>
                Page <span className={style.current}>{currentPage}</span>
                <span className={style.total}>of {totalPages}</span>
            </span>

            <button
                className={style.paginationButton}
                onClick={handleNextPage}
                disabled={disabled || currentPage >= totalPages}
                aria-label="Next page"
            >
                Next ▶
            </button>

            {totalResults !== undefined && totalResults > 0 && (
                <p className={style.resultInfo}>
                    Found {totalResults} result{totalResults > 1 ? "s" : ""}
                </p>
            )}
        </div>
    );
};
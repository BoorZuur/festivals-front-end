import Icon from "@mdi/react";
import {mdiChevronLeft, mdiChevronRight, mdiChevronDoubleLeft, mdiChevronDoubleRight} from "@mdi/js";

function Pagination({ pagination, currentPage, onPageChange }) {
    if (!pagination || pagination.totalPages <= 1) {
        return null;
    }

    const goToFirstPage = () => {
        if (pagination._links?.first && currentPage !== 1) {
            onPageChange(1);
        }
    };

    const goToPreviousPage = () => {
        if (pagination._links?.previous) {
            onPageChange(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (pagination._links?.next) {
            onPageChange(currentPage + 1);
        }
    };

    const goToLastPage = () => {
        if (pagination._links?.last && currentPage !== pagination.totalPages) {
            onPageChange(pagination._links.last.page);
        }
    };

    return (
        <div className="flex justify-center items-center gap-3 mt-8 mb-4">
            {/* First Page Button */}
            <button
                onClick={goToFirstPage}
                disabled={!pagination._links?.first || currentPage === 1}
                className={`flex items-center px-4 py-2 rounded transition-colors duration-200 ${
                    pagination._links?.first && currentPage !== 1
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                title="First Page"
            >
                <Icon path={mdiChevronDoubleLeft} className="w-6 h-6"/>
            </button>

            {/* Previous Page Button */}
            <button
                onClick={goToPreviousPage}
                disabled={!pagination._links?.previous}
                className={`flex items-center px-4 py-2 rounded transition-colors duration-200 ${
                    pagination._links?.previous
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                title="Previous Page"
            >
                <Icon path={mdiChevronLeft} className="w-6 h-6"/>
            </button>

            {/* Page Info */}
            <div className="px-4 py-2 bg-gray-100 rounded font-semibold">
                {currentPage} / {pagination.totalPages}
            </div>

            {/* Next Page Button */}
            <button
                onClick={goToNextPage}
                disabled={!pagination._links?.next}
                className={`flex items-center px-4 py-2 rounded transition-colors duration-200 ${
                    pagination._links?.next
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                title="Next Page"
            >
                <Icon path={mdiChevronRight} className="w-6 h-6"/>
            </button>

            {/* Last Page Button */}
            <button
                onClick={goToLastPage}
                disabled={!pagination._links?.last || currentPage === pagination.totalPages}
                className={`flex items-center px-4 py-2 rounded transition-colors duration-200 ${
                    pagination._links?.last && currentPage !== pagination.totalPages
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                title="Last Page"
            >
                <Icon path={mdiChevronDoubleRight} className="w-6 h-6"/>
            </button>
        </div>
    );
}

export default Pagination;

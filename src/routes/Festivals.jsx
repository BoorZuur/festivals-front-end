import {useEffect} from "react";
import {useSearchParams} from "react-router";
import ListItem from "../components/ListItem.jsx";
import Pagination from "../components/Pagination.jsx";
import {mdiLoading} from "@mdi/js";
import Icon from "@mdi/react";
import { useFestivals } from "../context/FestivalContext.jsx";

function Festivals() {
    const { festivals, pagination, loading, fetchFestivals } = useFestivals();
    const [searchParams, setSearchParams] = useSearchParams();
    const limit = 12;

    // Get page from URL or default to 1
    const currentPage = parseInt(searchParams.get('page')) || 1;

    useEffect(() => {
        fetchFestivals(limit, currentPage);
    }, [currentPage, fetchFestivals]);

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage.toString() });
    };

    return (
        <div className="container mx-auto p-4">
            {!loading && festivals.length > 0 ? (
                <>
                    <div className="flex justify-between items-center p-4">
                        <h1 className="text-3xl font-bold">All Festivals</h1>
                        {pagination && (
                            <p className="text-gray-600">
                                Page {pagination.currentPage} of {pagination.totalPages}
                                <span className="ml-2">({pagination.totalItems} total)</span>
                            </p>
                        )}
                    </div>

                    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
                        {festivals.map((festival) => (
                            <ListItem key={festival.id} item={festival}/>
                        ))}
                    </ul>

                    {/* Pagination Controls */}
                    <Pagination
                        pagination={pagination}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : loading ? (
                <div className="flex justify-center items-center p-8">
                    <Icon path={mdiLoading} className="w-40 h-40" spin/>
                </div>
            ) : (
                <div className="text-center p-8">
                    <p className="text-xl text-gray-600">No festivals found</p>
                </div>
            )}
        </div>
    );
}

export default Festivals;

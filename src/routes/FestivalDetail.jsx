import {useParams} from "react-router";
import {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiLoading, mdiAlertCircle} from "@mdi/js";
import {Link} from "react-router";
import CreateForm from "../components/createForm.jsx";
import { useFestivals } from "../context/FestivalContext.jsx";

function FestivalDetail() {
    const params = useParams();
    const id = params.id;
    const [Festival, setFestival] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const { fetchFestival } = useFestivals();

    const getFestival = async () => {
        const data = await fetchFestival(id);
        if (data) {
            setFestival(data);
            setNotFound(false);
        } else {
            setNotFound(true);
        }
    }

    useEffect(() => {
        getFestival();
    }, [id]);

    const handleFestivalUpdated = () => {
        // Refresh the festival data
        getFestival();
        // Exit edit mode
        setIsEditing(false);
    };

    // Show 404 if festival not found
    if (notFound) {
        return (
            <div className="container mx-auto p-4">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <Icon path={mdiAlertCircle} className="w-32 h-32 text-red-500 mb-6"/>
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">Festival Not Found</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-md">
                        Sorry, the festival you're looking for doesn't exist or has been removed.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            to="/festivals"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                        >
                            View All Festivals
                        </Link>
                        <Link
                            to="/"
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                        >
                            Go to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            {Festival ? (
                <>
                    <div className="flex justify-between items-center p-4">
                        <h1 className="text-3xl font-bold">{isEditing ? 'Edit Festival' : 'Festival Details'}</h1>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition-colors duration-200"
                        >
                            {isEditing ? 'Cancel Edit' : 'Edit Festival'}
                        </button>
                    </div>

                    {isEditing ? (
                        <CreateForm
                            festival={Festival}
                            festivalId={id}
                            isEditMode={true}
                            onCreated={handleFestivalUpdated}
                        />
                    ) : (
                        <article
                            className="bg-gray-100 p-6 rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row gap-6">
                            {/* Image */}
                            <div className="md:w-1/3 w-full">
                                <img
                                    className="w-full h-48 sm:h-56 md:h-64 object-contain rounded"
                                    src={Festival.imageUrl || '/vite.svg'}
                                    alt={Festival.name || Festival.title || 'Festival image'}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = '/vite.svg';
                                    }}
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-semibold mb-2">{Festival.name || Festival.title}</h2>
                                </div>
                                <p className="text-gray-700 mb-4">{Festival.description}</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                                    <div><span className="font-semibold">Review:</span> {Festival.review}</div>
                                    <div><span
                                        className="font-semibold">Bookmark:</span> {Festival.hasBookmark ? 'Yes' : 'No'}
                                    </div>
                                    <div><span className="font-semibold">Location type:</span> {Festival.locationType}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Coordinates:</span>
                                        {Festival.location?.coordinates ? (
                                            <span> {Festival.location.coordinates[0]}, {Festival.location.coordinates[1]}</span>
                                        ) : (
                                            <span> N/A</span>
                                        )}
                                    </div>
                                    <div><span
                                        className="font-semibold">Date:</span> {Festival.date ? new Date(Festival.date).toLocaleDateString() : 'N/A'}
                                    </div>
                                    <div><span className="font-semibold">Organizer:</span> {Festival.organizer || 'N/A'}
                                    </div>
                                    <div><span
                                        className="font-semibold">Country Code:</span> {Festival.countryCode || 'N/A'}
                                    </div>
                                </div>

                                {/* Genre */}
                                {Festival.genre && Festival.genre.length > 0 && (
                                    <div className="mt-4">
                                        <span className="font-semibold text-sm">Genre:</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {Festival.genre.map((g, index) => (
                                                <span key={index}
                                                      className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                                                {g}
                                            </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Lineup */}
                                {Festival.lineup && Festival.lineup.length > 0 && (
                                    <div className="mt-4">
                                        <span className="font-semibold text-sm">Lineup:</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {Festival.lineup.map((artist, index) => (
                                                <span key={index}
                                                      className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                                                {artist}
                                            </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <p className="text-xs text-gray-500 mt-4">ID: {Festival.id}</p>
                            </div>
                        </article>
                    )}
                </>
            ) : (
                <Icon path={mdiLoading} className="m-5 w-40" spin/>
            )}
        </div>
    );
}

export default FestivalDetail;

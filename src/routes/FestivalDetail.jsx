import {useParams} from "react-router";
import {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";

function FestivalDetail() {
    const params = useParams();
    const id = params.id;
    const [Festival, setFestival] = useState(null);
    const webservice = import.meta.env.VITE_WEBSERVICE_URL;

    const getFestival = async () => {
        try {
            const response = await fetch(`${webservice}/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setFestival(data);
            console.log(data)
        } catch (error) {
            console.error("Fout bij het ophalen van het Festivals:", error);
        }
    }

    useEffect(() => {
        getFestival();
    }, [id]);

    return (
        <div className="container mx-auto p-4">
            {Festival ? (
                <>
                    <h1 className="text-3xl font-bold p-4">Festival Details</h1>
                    <article
                        className="bg-gray-100 p-6 rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        <div className="md:w-1/3 w-full">
                            <img
                                src={Festival.imageUrl}
                                alt={Festival.title}
                                className="w-full h-full object-cover rounded"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold mb-2">{Festival.title}</h2>

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
                                    {Festival.loc?.coordinates ? (
                                        <span> {Festival.loc.coordinates[0]}, {Festival.loc.coordinates[1]}</span>
                                    ) : (
                                        <span> N/A</span>
                                    )}
                                </div>
                                <div><span
                                    className="font-semibold">Date:</span> {Festival.date ? new Date(Festival.date).toLocaleDateString() : 'N/A'}
                                </div>
                                <div><span
                                    className="font-semibold">Created at:</span> {Festival.createdAt ? new Date(Festival.createdAt).toLocaleString() : 'N/A'}
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 mt-4">ID: {Festival.id}</p>
                        </div>
                    </article>
                </>
            ) : (
                <Icon path={mdiLoading} className="m-5 w-40" spin/>
            )}
        </div>
    );
}

export default FestivalDetail;
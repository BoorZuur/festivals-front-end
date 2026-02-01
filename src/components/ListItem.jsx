import Icon from "@mdi/react";
import {mdiBookmark, mdiBookmarkOutline, mdiCalendar, mdiDelete, mdiInformation, mdiMapMarker} from "@mdi/js";
import {Link} from "react-router";
import { useFestivals } from "../context/FestivalContext.jsx";


function ListItem({item}) {
    const { deleteFestival, toggleBookmark } = useFestivals();

    const handleDelete = async () => {
        const result = await deleteFestival(item.id);
        if (result.success) {
            alert("Festival deleted");
        } else {
            alert(`Error: ${result.error || 'Failed to delete Festival'}`);
        }
    }

    const handleToggleBookmark = async (e) => {
        e.preventDefault(); // Prevent navigation if inside a link
        const result = await toggleBookmark(item.id, item.hasBookmark);
        if (!result.success) {
            alert(`Error: ${result.error || 'Failed to toggle bookmark'}`);
        }
    }

    return (
        <article>
            <li className="bg-gray-100 max-w-sm rounded overflow-hidden shadow-lg relative">
                {/* Bookmark Button - Top Right Corner */}
                <button
                    onClick={handleToggleBookmark}
                    className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all duration-200 z-10"
                    title={item.hasBookmark ? "Remove bookmark" : "Add bookmark"}
                >
                    <Icon
                        path={item.hasBookmark ? mdiBookmark : mdiBookmarkOutline}
                        className={`w-6 h-6 ${item.hasBookmark ? 'text-yellow-500' : 'text-gray-600'}`}
                    />
                </button>

                <img
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                    src={item.imageUrl || '/vite.svg'}
                    alt={item.name || 'Festival image'}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/vite.svg';
                    }}
                />
                <div className="px-6 py-4">
                    <h2 className="font-bold text-xl mb-2">{item.name}</h2>
                    <p className="text-gray-700 text-base">{item.description.substring(0, 60)}</p>
                    <div className="flex items-center mt-2">
                        <Icon path={mdiMapMarker} className="text-gray-500 w-5 h-5"/>
                        <p className="ml-1 text-gray-500 text-sm">{item.locationType}</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <Icon path={mdiCalendar} className="text-gray-500 w-5 h-5"/>
                        <p className="ml-1 text-gray-500 text-sm">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <Link to={`/festivals/${item.id}`}
                              className="text-white bg-blue-600 hover:bg-blue-700 p-3 rounded cursor-pointer">
                            <div className="flex items-center">
                                <Icon path={mdiInformation} className="text-white w-5 h-5"/>
                                <span className="ml-1">Details</span>
                            </div>
                        </Link>
                        <button onClick={handleDelete}
                                className="text-white bg-red-600 hover:bg-red-700 p-3 rounded cursor-pointer">
                            <div className="flex items-center">
                                <Icon path={mdiDelete} className="text-white w-5 h-5"/>
                                <span className="ml-1">Delete</span>
                            </div>
                        </button>
                    </div>
                </div>
            </li>
        </article>
    );
}

export default ListItem;
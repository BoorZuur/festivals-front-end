import Icon from "@mdi/react";
import {mdiBookmark, mdiCalendar, mdiDelete, mdiInformation, mdiMapMarker} from "@mdi/js";
import {Link} from "react-router";


function ListItem({spotDeleted, item}) {
    const webservice = import.meta.env.VITE_WEBSERVICE_URL;

    const deleteSpot = async () => {
        try {
            const response = await fetch(`${webservice}/${item.id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 204) {
                alert("Festival deleted");
                spotDeleted();
            } else {
                const data = await response.json();
                console.log(data);
                alert(`Error: ${data.error || 'Failed to delete Festival'}`);
            }
        } catch (error) {
            console.error("Fout bij het verwijderen van het Festival:", error);
            alert("Er is een fout opgetreden bij het verwijderen");
        }
    }

    return (
        <article>
            <li className="bg-gray-100 max-w-sm rounded overflow-hidden shadow-lg">
                <img
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                    src={item.imageUrl || '/vite.svg'}
                    alt={item.title || 'Festival image'}
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/vite.svg';
                    }}
                />
                <div className="px-6 py-4">
                    <span>{item.hasBookmark ? <Icon path={mdiBookmark} className="text-gray-500 w-5 h-5"/> : ''}</span>
                    <h2 className="font-bold text-xl mb-2">{item.title}</h2>
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
                        <button onClick={deleteSpot}
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
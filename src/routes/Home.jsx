import {useEffect, useState} from "react";
import ListItem from "../components/ListItem.jsx";
import {mdiLoading} from "@mdi/js";
import Icon from "@mdi/react";

function Home() {
    const [Festivals, setFestivals] = useState(null);
    const webservice = import.meta.env.VITE_WEBSERVICE_URL;

    const getFestivals = async () => {
        try {
            const response = await fetch(webservice, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    // en overige headers
                },
            });
            const data = await response.json();
            setFestivals(data.items);
            // console.log(data)
        } catch (error) {
            console.error("Fout bij het ophalen van het Festivals:", error);
        }
    }

    useEffect(() => {
        getFestivals();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {Festivals ? (
                <>
                    <h1 className="text-3xl font-bold p-4">Alle Festivals</h1>
                    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
                        {Festivals.map((festival) => (
                            <ListItem key={festival.id} item={festival} spotDeleted={getFestivals}/>
                        ))}
                    </ul>

                </>
            ) : (
                <Icon path={mdiLoading} className="m-5 w-40" spin/>
            )}
        </div>
    );
}

export default Home;
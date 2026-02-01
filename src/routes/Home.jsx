import {Link} from "react-router";
import Icon from "@mdi/react";
import {mdiMusic, mdiMapMarker, mdiMusicNote, mdiStar} from "@mdi/js";

function Home() {
    return (
        <div className="container mx-auto p-4">
            {/* Hero Section */}
            <section className="text-center py-12 px-4">
                <h1 className="text-5xl font-bold mb-4 text-gray-800">
                    Welcome to Festival Finder
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Discover the best music festivals!
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        to="/festivals"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                    >
                        View All Festivals
                    </Link>
                    <Link
                        to="/create"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                    >
                        Add Festival
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {/* Feature 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="flex justify-center mb-4">
                            <Icon path={mdiMusic} className="w-16 h-16 text-blue-600"/>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Discover Festivals</h3>
                        <p className="text-gray-600">
                            Find the best music festivals in the Netherlands and beyond
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="flex justify-center mb-4">
                            <Icon path={mdiStar} className="w-16 h-16 text-yellow-500"/>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Read Reviews</h3>
                        <p className="text-gray-600">
                            Read experiences from other festival-goers and make your choice
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="flex justify-center mb-4">
                            <Icon path={mdiMapMarker} className="w-16 h-16 text-red-600"/>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">View Locations</h3>
                        <p className="text-gray-600">
                            See where festivals take place and plan your trip
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="flex justify-center mb-4">
                            <Icon path={mdiMusicNote} className="w-16 h-16 text-purple-600"/>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Lineup Info</h3>
                        <p className="text-gray-600">
                            See which artists are performing at which festival
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;


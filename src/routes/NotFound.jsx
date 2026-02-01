import {Link} from "react-router";
import Icon from "@mdi/react";
import {mdiAlertCircle} from "@mdi/js";

function NotFound() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <Icon path={mdiAlertCircle} className="w-32 h-32 text-red-500 mb-6"/>
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-md">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex gap-4">
                    <Link
                        to="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                    >
                        Go to Home
                    </Link>
                    <Link
                        to="/festivals"
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                    >
                        View All Festivals
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;

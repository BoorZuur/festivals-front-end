import {createBrowserRouter, RouterProvider} from "react-router";
// import je components
import Layout from "./Layout.jsx";
import Home from "./routes/Home.jsx";
import CreateFestival from "./routes/CreateFestival.jsx";
import FestivalDetail from "./routes/FestivalDetail.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/create",
                element: <CreateFestival/>,
            },

            {
                path: "/festivals/:id",
                element: <FestivalDetail/>,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
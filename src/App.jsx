import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./Layout.jsx";
import Home from "./routes/Home.jsx";
import Festivals from "./routes/Festivals.jsx";
import CreateFestival from "./routes/CreateFestival.jsx";
import FestivalDetail from "./routes/FestivalDetail.jsx";
import NotFound from "./routes/NotFound.jsx";
import { FestivalProvider } from "./context/FestivalContext.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/festivals",
                element: <Festivals/>,
            },
            {
                path: "/create",
                element: <CreateFestival/>,
            },
            {
                path: "/festivals/:id",
                element: <FestivalDetail/>,
            },
            {
                path: "*",
                element: <NotFound/>,
            },
        ],
    },
]);

function App() {
    return (
        <FestivalProvider>
            <RouterProvider router={router}/>
        </FestivalProvider>
    );
}

export default App;
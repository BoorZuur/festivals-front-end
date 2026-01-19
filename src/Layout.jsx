import {Link, Outlet} from "react-router";

function Layout() {
    return (
        <>
            <header>
                <nav
                    className="block mt-2 w-full max-w-5xl px-4 py-2 mx-auto bg-gray-100 bg-opacity-90 sticky top-3 shadow backdrop-blur-lg backdrop-saturate-150 z-[9999]">
                    <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
                        <Link to={`/`}
                              className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold">
                            Festivals
                        </Link>
                        <div>
                            <ul className="flex flex-row gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:gap-6">
                                <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                                    <Link to={`/`} className="flex items-center">Home</Link>
                                </li>
                                <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                                    <Link to={`/create`} className="flex items-center">Create</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer className="text-center p-4 mt-8 border-t">
                <p>&copy; Martijn Tas</p>
            </footer>
        </>
    );
}

export default Layout;
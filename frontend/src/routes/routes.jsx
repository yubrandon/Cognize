import HomePage from "../pages/HomePage";
import ViewDeckPage from "../pages/ViewDeckPage";
import CreateDeckPage from "../pages/CreateDeckPage";

const routes = [
    {
        path: "/",
        element: <HomePage />,
        //errorElement: ,
    },
    {
        path: "/sets",
        element: <ViewDeckPage />,
    },
    {
        path: "/sets/create",
        element: <CreateDeckPage />
    },
];

export default routes;
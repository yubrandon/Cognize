import HomePage from "../pages/HomePage";
import ViewSetsPage from "../pages/ViewSetsPage";
import CreateDeckPage from "../pages/CreateDeckPage";

const routes = [
    {
        path: "/",
        element: <HomePage />,
        //errorElement: ,
    },
    {
        path: "/sets",
        element: <ViewSetsPage />,
    },
    {
        path: "/sets/create",
        element: <CreateDeckPage />
    },
];

export default routes;
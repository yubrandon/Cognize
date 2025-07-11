import HomePage from "../pages/HomePage";
import ViewDecksPage from "../pages/ViewDecksPage";
import CreateDeckPage from "../pages/CreateDeckPage";
import ViewCardsPage from "../pages/ViewCardsPage";

const routes = [
    {
        path: "/",
        element: <HomePage />,
        //errorElement: ,
    },
    {
        path: "/sets",
        element: <ViewDecksPage />,
    },
    {
        path: "/sets/create",
        element: <CreateDeckPage />
    },
    {
        path:"/sets/:deckId",
        element: <ViewCardsPage />
    }
];

export default routes;
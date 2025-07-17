import HomePage from "../pages/HomePage";
import ViewDecksPage from "../pages/ViewDecksPage";
import CreateDeckPage from "../pages/CreateDeckPage";
import ViewCardsPage from "../pages/ViewCardsPage";
import EditCardsPage from "../pages/EditCardsPage";
import QuizPage from "../pages/QuizPage";

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
    },
    {
        path:"/sets/:deckId/edit",
        element: <EditCardsPage />
    },
    {
        path:"/sets/:deckId/quiz",
        element: <QuizPage />
    }
];

export default routes;
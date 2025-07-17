import HomePage from "../pages/HomePage";
import ViewDecksPage from "../pages/DeckContentPages/ViewDecksPage";
import CreateDeckPage from "../pages/CreateDeckPage";
import ViewCardsPage from "../pages/DeckContentPages/ViewCardsPage";
import EditCardsPage from "../pages/DeckContentPages/EditCardsPage";
import QuizPage from "../pages/QuizPage/QuizPage";
import QuizRoutes from "./QuizRoutes";

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
        element: <QuizPage />,
        children: QuizRoutes
    }
];

export default routes;
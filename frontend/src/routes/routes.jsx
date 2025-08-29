import HomePage from "../pages/HomePage";
import ViewDecksPage from "../pages/DeckContentPages/ViewDecksPage";
import CreateDeckPage from "../pages/DeckContentPages/CreateDeckPage";
import ViewCardsPage from "../pages/DeckContentPages/ViewCardsPage";
import EditCardsPage from "../pages/DeckContentPages/EditCardsPage";
import QuizPage from "../pages/QuizPage/QuizPage";
import DeckCarouselPage from "../pages/DeckContentPages/DeckCarouselPage";

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
    },
    {
        path:"/sets/:deckId/review",
        element: <DeckCarouselPage />
    }
];

export default routes;
import ReviewQuestionsPage from "../pages/QuizPage/ReviewQuestionsPage";
import StudyQuestionsPage from "../pages/QuizPage/StudyQuestionsPage";
import ChallengeQuestionsPage from "../pages/QuizPage/ChallengeQuestionsPage";
const QuizRoutes = [
    {
        path:"review",
        element: <ReviewQuestionsPage />
    },
    {
        path:"learn",
        element: <StudyQuestionsPage />
    },
    {
        path:"challenge",
        element: <ChallengeQuestionsPage />
    },
]

export default QuizRoutes;
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import getCards from "../../api/cards/getCards";
import generateQuestions from "../../api/quiz/generateQuestions";
import QuizStartPage from "./QuizStartPage";
import ReviewQuestionsPage from "./ReviewQuestionsPage";
import StudyQuestionsPage from "./StudyQuestionsPage";
import ChallengeQuestionsPage from "./ChallengeQuestionsPage";
import QuizCompletePage from "./QuizCompletePage";
import parseOutput from "../../api/quiz/parseOutput";

const QuizPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    const { deckId } = useParams();
    const [questions, setQuestions] = useState({review:null, study:null, challenge:null});

    const changeMode = (newMode) => {
        setSearchParams({mode: newMode});
    }
    useEffect(() => {
        const fetchCards = async () => {
            const deckData = await getCards(deckId)
                .catch((error) => setError(error));
            if(!error) {
                const res = await generateQuestions(deckData.name, JSON.stringify(deckData.cards));
                const json = await res.json();
                const questionData = parseOutput(json);
                setQuestions(questionData);
                setLoading(false);
            }
            else {
                alert(error);
            }
        }
        fetchCards();
    }, []);
    if(loading) return <h1>Generating questions...</h1>
    if(error) return <h1>{error}</h1>

    if(!mode) return <QuizStartPage changeMode={changeMode}/>
    if(mode === "review") return <ReviewQuestionsPage questions={questions.review} changeMode={changeMode}/>
    if(mode === "study") return <StudyQuestionsPage questions={questions.study} changeMode={changeMode}/>
    if(mode === "challenge") return <ChallengeQuestionsPage questions={questions.challenge} changeMode={changeMode}/>
    if(mode === "finish") return <QuizCompletePage />
    
    return (
        <h1>404 Page Not Found</h1>
    )

}

export default QuizPage;
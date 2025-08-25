import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import getCards from "../../api/cards/getCards";
import QuizStartPage from "./QuizStartPage";
import QuizCompletePage from "./QuizCompletePage";
import QuizResultsPage from "./QuizResultsPage";
import QuizQuestionPage from "./QuizQuestionPage";
import generateQuestions from "../../api/quiz/generateQuestions";
import parseOutput from "../../api/quiz/parseOutput";

const QuizPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    const { deckId } = useParams();
    const [questions, setQuestions] = useState({review:null, study:null, challenge:null});
    const [userResponse, setUserResponse] = useState({review:null, study:null, challenge:null});
    const navigate = useNavigate();

    const changeMode = (newMode) => {
        setSearchParams({mode: newMode});
    }
    const handleResponse = (response) => {
        const currentResponse = userResponse;
        currentResponse[mode] = response;
        setUserResponse(currentResponse);
    }
    useEffect(() => {
        const fetchCards = async () => {
            const deckData = await getCards(deckId)
                .catch((error) => setError(error));
            if(!error) {
                try {
                    const generatedQuestions = await generateQuestions(deckData.name, JSON.stringify(deckData.cards));
                    const questionData = await parseOutput(generatedQuestions);
                    setQuestions(questionData);
                    setLoading(false);                
                }
                catch (e) {
                    alert(e);
                    navigate(`/sets/${deckId}`);                
                }

            }
            else {
                alert(error);
                navigate(`/sets/${deckId}`);
            }
        }
        fetchCards();
    }, []);
    if(loading) return <h1>Generating questions, please wait....</h1>
    if(error) return <h1>{error}</h1>

    if(!mode) return <QuizStartPage changeMode={changeMode}/>
    if(mode === "review") return <QuizQuestionPage questions={questions.review} changeMode={changeMode} handleResponse={handleResponse} nextMode="study"/>
    if(mode === "study") return <QuizQuestionPage questions={questions.study} changeMode={changeMode} handleResponse={handleResponse} nextMode="challenge"/>
    if(mode === "challenge") return <QuizQuestionPage questions={questions.challenge} changeMode={changeMode} handleResponse={handleResponse} nextMode="complete"/>
    if(mode === "complete") return <QuizCompletePage changeMode={changeMode}/>
    if(mode === "results") return <QuizResultsPage questions={questions} responses={userResponse} />
    return (
        <h1>404 Page Not Found</h1>
    )

}

export default QuizPage;
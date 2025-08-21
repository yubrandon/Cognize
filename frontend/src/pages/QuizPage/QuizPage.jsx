import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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
                //const res = await generateQuestions(deckData.name, JSON.stringify(deckData.cards));
                //const json = await res.json();
                //const questionData = parseOutput(json);
                const json = `
                {
                    "review": [
                        {"question": "What does IM stand for in medical abbreviations?", "answer": "intramuscular"},
                        {"question": "In prescription contexts, what does 'after' signify?", "answer": "post"},
                        {"question": "What is the abbreviation for taking medication by mouth?", "answer": "PO"},
                        {"question": "What does 'pediatric' abbreviate to?", "answer": "Ped"},
                        {"question": "In pharmacy, what is PCN commonly used for?", "answer": "penicillin"},
                        {"question": "What does 'pc' mean when seen on a prescription?", "answer": "after meals"}
                    ],
                    "study": [
                        {"question": "What does 'post' refer to in medical shorthand not directly listed here?", "answer": "after"},
                        {"question": "For a pediatric patient, what abbreviation might be combined with a antibiotic?", "answer": "Ped"},
                        {"question": "What condition is often monitored when using 'IM' administration?", "answer": "intramuscular injection sites"},
                        {"question": "If a medication is given 'ut dict', how might it be administered daily?", "answer": "as directed"}
                    ],
                    "challenge": [
                        {"question": "What abbreviation would be appropriate for a drug to be administered twice daily, and why might it not be used here compared to 'ut dict'?", "answer": "bid"},
                        {"question": "Based on common pharmacy practices, what does 'ad hoc' indicate, and is it related to the concepts here?", "answer": "ad hoc means 'for a specific purpose'"}
                    ]
                }
                    `;
                const questionData = JSON.parse(json)
                setQuestions(questionData);
                setLoading(false);
            }
            else {
                alert(error);
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
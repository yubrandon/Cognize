import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mergeQuizData from "../../api/quiz/mergeQuizData";
import parseOutput from "../../api/quiz/parseOutput";
import generateResults from "../../api/quiz/generateResults";
import getCards from "../../api/cards/getCards";
import QuizResultCategory from "../../components/quiz/QuizResultCategory";

const QuizResultsPage = ({ questions, responses }) => {
    const navigate = useNavigate();
    const { deckId } = useParams();
    const [error, setError] = useState(null);
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);
    const hasParsed = useRef(false);

    const handleReturn = () => {
        navigate(`/sets/${deckId}`);
    }
    
    useEffect(() => {
        if(hasParsed.current) return;
        hasParsed.current = true;

        const handleResults = async () => {
            const deckData = await getCards(deckId)
                .catch((error) => setError(error));
            if(!error) {
                try {
                    const quizData = mergeQuizData(questions, responses);
                    const quizResults = await generateResults(deckData.name, JSON.stringify(quizData));
                    const resultData = await parseOutput(quizResults);
                    setResults(resultData);
                    setLoading(false);
                }
                catch (e) {
                    alert(e);
                    navigate(`/sets/${deckId}`);
                }            
            }

        }
        handleResults();
    }, []);
    if(loading) return <h1>Loading...</h1>
    return (
        <div>
            <h1>Quiz Results</h1>
            <QuizResultCategory category={"Review"} questionSet={results.review}/>
            <QuizResultCategory category={"Study"} questionSet={results.study}/>
            <QuizResultCategory category={"Challenge"} questionSet={results.challenge}/>
            <button type="button" onClick={handleReturn}>Return to Deck</button>
        </div>
    )
}

export default QuizResultsPage;
import { useState, useEffect } from "react";
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
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const handleResults = async () => {
            const deckData = await getCards(deckId)
                .catch((error) => setError(error));
            if(!error) {
                try {
                    const quizData = mergeQuizData(questions, responses);
                    console.log('quiz info',quizData);
                    const quizResults = await generateResults(deckData.name, JSON.stringify(quizData));
                    const resultData = parseOutput(quizResults);
                    setResult(resultData);
                    setLoading(false);
                }
                catch (e) {
                    console.log('error',e);
                    //navigate(`/sets/${deckId}`);
                }            
            }

        }
        handleResults();
    }, []);
    if(loading) return <h1>Loading...</h1>
    return (
        <div>
            <p>results</p>
            <QuizResultCategory category={"Review"} questionSet={result.review}/>
            <QuizResultCategory category={"Study"} questionSet={result.study}/>
            <QuizResultCategory category={"Challenge"} questionSet={result.challenge}/>

        </div>
    )
}

export default QuizResultsPage;
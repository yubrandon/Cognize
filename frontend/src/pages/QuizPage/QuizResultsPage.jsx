import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mergeQuizData from "../../api/quiz/mergeQuizData";
import parseOutput from "../../api/quiz/parseOutput";
import generateResults from "../../api/quiz/generateResults";
import getCards from "../../api/cards/getCards";

const QuizResultsPage = ({ questions, responses }) => {
    const navigate = useNavigate();
    const { deckId } = useParams();
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const handleResults = async () => {
            const deckData = await getCards(deckId)
                .catch((error) => setError(error));
            if(!error) {
                try {
                    const quizData = mergeQuizData(questions, responses);
                    console.log(quizData);
                    const quizResults = await generateResults(deckData.name, JSON.stringify(quizData));
                    const resultData = parseOutput(quizResults);
                    //console.log(resultData);
                }
                catch (e) {
                    console.log(e);
                    navigate(`/sets/${deckId}`);
                }            
            }

        }
        handleResults();
    }, []);
    //check user responses
    return (
        <div>
            <p>results</p>
        </div>
    )
}

export default QuizResultsPage;
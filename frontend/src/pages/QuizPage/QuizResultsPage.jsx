import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mergeQuizData from "../../api/quiz/mergeQuizData";

const QuizResultsPage = ({ questions, responses }) => {
    const navigate = useNavigate();
    const { deckId } = useParams();

    useEffect(() => {
        const handleResults = async () => {
            try {
                const quizData = mergeQuizData(questions, responses);
                console.log(quizData);
            }
            catch (e) {
                console.log(e);
                navigate(`/sets/${deckId}`);
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
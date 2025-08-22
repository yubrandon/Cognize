import { useNavigate, useParams } from "react-router-dom";
import QuizQuestionCard from "../../components/quiz/QuizQuestionCard";
import { useEffect } from "react";

//if going back a page, most likely questions argument is undefined, so navigate to quiz start
const QuizQuestionPage = ({questions, changeMode, handleResponse, nextMode}) => {
    const navigate = useNavigate();
    const { deckId } = useParams();
    useEffect(() => {
        if(!questions) navigate(`/sets/${deckId}`);
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Obtain form inputs
        const formData = new FormData(e.target);
        const userResponse = Object.fromEntries(formData);
        const responses = Object.values(userResponse);
        // Use callback function to store user response in a global state
        handleResponse(responses);
        // Move to next page by changing parameters
        changeMode((nextMode));
    }
    return (
        <div>
            <p>Review</p>
            <form onSubmit={handleSubmit}>
                {
                    questions.map((question, index) => {
                        return (
                            <QuizQuestionCard 
                                key={index}
                                question={question.question}
                                index={index}/>
                        )
                    })
                }
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default QuizQuestionPage;
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import QuizQuestionCard from "../../components/quiz/QuizQuestionCard";
import { useEffect } from "react";
import Button from "/src/components/buttons/Button.jsx"

//if going back a page, most likely questions argument is undefined, so navigate to quiz start
const QuizQuestionPage = ({questions, changeMode, handleResponse, nextMode}) => {
    const navigate = useNavigate();
    const { deckId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get('mode');
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
        <div className="flex flex-col p-5 ml-7">
            <h1 className="text-4xl py-2">Review</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col py-2 gap-4">
                {
                    questions.map((question, index) => {
                        return (
                            <QuizQuestionCard 
                                key={`${mode}${index}`}
                                question={question.question}
                                index={index}
                            />
                        )
                    })
                }
                </div>
                <Button type="submit" color="green" text="Next" paddingX={4} paddingY={2} classes="mt-1"></Button>
            </form>
        </div>
    )
}

export default QuizQuestionPage;
import { useNavigate, useParams } from "react-router-dom";
import QuizResultCard from "./QuizResultCard";


const QuizResultCategory = ({category, questionSet}) => {
    const { deckId } = useParams();
    const navigate = useNavigate();

    if(!questionSet) {
        alert('Error! Navigating to quiz page!');
        navigate(`/sets/${deckId}`);
    }
    return (
        <div className="">
            <h1 className="text-4xl font-semibold">{category}</h1>
            <div className="">
            {
                questionSet.map((result, index) => {
                    return (
                        <div>
                            <QuizResultCard 
                                key={`${category}${index}`}
                                question={result.question}
                                answer={result.answer}
                                userResponse={result.userResponse}
                                correct={result.correct}
                                comments={result.comments}
                            />
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default QuizResultCategory;
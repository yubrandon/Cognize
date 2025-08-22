import { useNavigate, useParams } from "react-router-dom";
import QuizResultCard from "./QuizResultCard";


const QuizResultCategory = ({category, questionSet}) => {
    const { deckId } = useParams();
    console.log(questionSet);
    const navigate = useNavigate();

    if(!questionSet) {
        alert('Error! Navigating to quiz page!');
        navigate(`/sets/${deckId}`);
    }
    return (
        <div>
            <h1>{category}</h1>
            {
                questionSet.map((result, index) => {
                    return (
                        <div>
                            <QuizResultCard 
                                key={`${category}${index}`}
                                question={result.question}
                                answer={result.answer}
                                correct={result.correct}
                                comments={result.comments}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QuizResultCategory;
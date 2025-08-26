import { useSearchParams } from "react-router-dom";

const QuizQuestionCard = ({index, question}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    return (
        <div>
            <label htmlFor={`${mode}question${index}`}>{question}</label>
            <input
                type="text" 
                id={`${mode}question${index}`} 
                name={`${mode}question${index}`}
            ></input>
        </div>
    )
}

export default QuizQuestionCard;
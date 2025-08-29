import { useSearchParams } from "react-router-dom";

const QuizQuestionCard = ({index, question}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    return (
        <div className="flex">
            <div className="flex flex-col bg-neutral-50 px-3 py-4 w-4xl rounded-lg shadow-md">
                <label htmlFor={`${mode}question${index}`}>{question}</label>
                <input
                    type="text" 
                    id={`${mode}question${index}`} 
                    name={`${mode}question${index}`}
                    className="border border-slate-300"
                ></input>
            </div>
        </div>

    )
}

export default QuizQuestionCard;
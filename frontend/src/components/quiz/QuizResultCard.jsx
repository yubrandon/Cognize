const QuizResultCard = ({question, answer, userResponse, correct, comments}) => {
    return (
        <div className="flex flex-col gap-1 py-2">
            <p  className={`text-lg font-semibold 
                ${correct ? 'bg-green-300': 'bg-red-300'}`}
            >Question: {question}</p>
            <p>Answer: {answer}</p>
            <p>Your response:{userResponse}</p>
            <p>Comments:{comments}</p>
        </div>
    )
}

export default QuizResultCard;
const QuizQuestionCard = ({index, question}) => {
    return (
        <div>
            <label htmlFor={`question${index}`}>{question}</label>
            <input
                type="text" 
                id={`question${index}`} 
                name={`question${index}`}
            ></input>
        </div>
    )
}

export default QuizQuestionCard;
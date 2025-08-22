const QuizResultCard = ({question, answer, correct, comments}) => {
    return (
        <div>
            <p>{question}</p>
            <p>{answer}</p>
            <p>{correct}</p>
            <p>{comments}</p>
        </div>
    )
}

export default QuizResultCard;
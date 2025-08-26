const QuizResultCard = ({question, answer, correct, comments}) => {
    return (
        <div>
            <p>question:{question}</p>
            <p>answer:{answer}</p>
            <p>correct:{correct ? 'yes' : "no"}</p>
            <p>comments:{comments}</p>
        </div>
    )
}

export default QuizResultCard;
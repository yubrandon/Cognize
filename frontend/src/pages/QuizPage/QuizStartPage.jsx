const QuizStartPage = ({ changeMode }) => {
    const handleChange = () => {
        changeMode("review");
    }
    return (
        <div>
            <p>start the quiz!</p>
            <button type="review" onClick={handleChange}>go!</button>
        </div>
    )
}

export default QuizStartPage;
const QuizCompletePage = ({ changeMode }) => {
    const handleResults = () => {
        changeMode("results");
    }

    return (
        <div>
           <h1>Congratulations! You have finished your quiz!</h1>
           <button type="button" onClick={handleResults}>View your results</button>
        </div>
    )
}

export default QuizCompletePage;
import Button from "/src/components/buttons/Button.jsx"
const QuizCompletePage = ({ changeMode }) => {
    const handleResults = () => {
        changeMode("results");
    }

    return (
        <div className="flex flex-col items-center">
           <h1 className="flex justify-center p-3 text-lg font-medium">Congratulations! You have finished your quiz!</h1>
           <div>
            <Button type="button" onClick={handleResults} text="View your results" color="green" paddingX={4} paddingY={2}></Button>
           </div>
        </div>
    )
}

export default QuizCompletePage;
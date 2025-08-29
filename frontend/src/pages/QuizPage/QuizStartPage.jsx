import PrimaryButton from "../../components/buttons/PrimaryButton";

const QuizStartPage = ({ changeMode }) => {
    const handleChange = () => {
        changeMode("review");
    }
    return (
        <div className="flex flex-row justify-center items-center w-screen h-screen">
            <PrimaryButton type="button" onClick={handleChange} text="Start Quiz!"></PrimaryButton>
        </div>
    )
}

export default QuizStartPage;
import { useNavigate } from "react-router-dom";
const QuizCompletePage = (responses) => {
    const navigate = useNavigate();
    const handleResults = () => {
        
    }

    return (
        <div>
           <h1>Finished!</h1>
           <button type="button" onClick={handleResults}>View your results</button>
        </div>
    )
}

export default QuizCompletePage;
import QuizQuestionCard from "../../components/cards/QuizQuestionCard";

//if going back a page, most likely questions argument is undefined, so navigate to quiz start
const ReviewQuestionsPage = ({questions, changeMode, handleResponse}) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Obtain form inputs
        const formData = new FormData(e.target);
        const userResponse = Object.fromEntries(formData);
        const responses = Object.values(userResponse);
        // Use callback function to store user response in a global state
        handleResponse(responses);
        // Move to next page by changing parameters
        changeMode(("study"));
    }
    console.log(questions, 'test');
    return (
        <div>
            <p>Review</p>
            <form onSubmit={handleSubmit}>
                {
                    questions.map((question, index) => {
                        return (
                            <QuizQuestionCard 
                                key={index}
                                question={question.question}
                                index={index}/>
                        )
                    })
                }
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default ReviewQuestionsPage;
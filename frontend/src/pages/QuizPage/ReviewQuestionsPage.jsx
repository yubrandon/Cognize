//if going back a page, most likely questions argument is undefined, so navigate to quiz start
const ReviewQuestionsPage = ({questions, changeMode}) => {
    const handleChange = () => {
        changeMode(("study"));
    }
    return (
        <div>
            <p>review</p>
            <button type="button" onClick={handleChange}>next</button>
        </div>
    )
}

export default ReviewQuestionsPage;
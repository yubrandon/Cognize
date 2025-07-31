const StudyQuestionsPage = ({questions, changeMode}) => {
    const handleChange = () => {
        changeMode("challenge")
    }
    return (
        <div>
            <p>study</p>
            <button type="button" onClick={handleChange}>next</button>
        </div>
    )
}

export default StudyQuestionsPage;
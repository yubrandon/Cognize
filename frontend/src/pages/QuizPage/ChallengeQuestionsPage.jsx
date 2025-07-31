const ChallengeQuestionsPage = ({questions,changeMode}) => {
    const handleChange = () => {
        changeMode("finish");
    }
    
    return (
        <div>
            <p>challenge</p>
            <button type="button" onClick={handleChange}>next</button>
        </div>
    )

}
export default ChallengeQuestionsPage;

const StudyViewCard = ({id, term, definition}) => {
    return (
        <div className="card">
            <p>id:{id}</p>
            <p>term:{term}</p>
            <p>definition:{definition}</p>
            <br></br>
        </div>
    )
}

export default StudyViewCard;
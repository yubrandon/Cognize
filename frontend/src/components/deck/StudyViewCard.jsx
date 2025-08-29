
const StudyViewCard = ({id, term, definition}) => {
    return (
        <div className="flex flex-row justify-between bg-neutral-50 p-2 w-4xl rounded-lg shadow-md">
            <div className="flex justify-center w-1/2 py-3 border-r border-slate-300">
                <p>{term}</p>
            </div>
            <div className="flex justify-center w-1/2 ml-4 py-3">
                <p>{definition}</p>
            </div>
            <br></br>
        </div>
    )
}

export default StudyViewCard;
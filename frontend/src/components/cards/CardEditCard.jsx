import { useState } from "react";

const CardEditCard = ({deckId, cardId, term, def, index, handleDelete}) => {
    const [termVal, setTermVal] = useState(term);
    const [defVal, setDefVal] = useState(def);

    return (
        <div className="card">
            <p>{index+1}</p>
            <label htmlFor={`term${index}`}>Term</label>
            <input type="text" id={`term${index}`} name={`term${index}`}
                    value={termVal}
                    onChange={(e) => setTermVal(e.target.value)}
            ></input>
            <label htmlFor={`definition${index}`}>Definition</label>
            <input type="text" id={`definition${index}`} name={`definition${index}`}
                value={defVal}
                onChange={(e) => setDefVal(e.target.value)}
            ></input>
            <button
                type="button"
                onClick={handleDelete}
            >Delete</button>
        </div>
    )
}

export default CardEditCard;
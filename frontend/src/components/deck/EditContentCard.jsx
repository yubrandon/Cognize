import { useState } from "react";
import Button from "../buttons/Button";

const EditContentCard = ({deckId, cardId, term, def, index, handleDelete}) => {
    const [termVal, setTermVal] = useState(term);
    const [defVal, setDefVal] = useState(def);
    const handleClick = () => {
        handleDelete(index);
    }

    return (
        <div className="flex flex-col bg-neutral-50 pl-10 pr-16 py-4 rounded-lg shadow-md gap-1">
            <div className="flex flex-row-reverse">
                <p className="">{index+1}</p>
            </div>
            <div className="flex flex-row gap-6">
                <div className="flex flex-row items-center gap-2">
                    <label htmlFor={`term${index}`}>Term</label>
                    <input type="text" id={`term${index}`} name={`term${index}`}
                            value={termVal}
                            onChange={(e) => setTermVal(e.target.value)} 
                            required
                            className="rounded-sm p-1 border border-slate-300"
                    ></input>            
                </div>


                <div  className="flex flex-row items-center gap-2">
                    <label htmlFor={`definition${index}`}>Definition</label>
                    <input type="text" id={`definition${index}`} name={`definition${index}`} 
                        value={defVal}
                        onChange={(e) => setDefVal(e.target.value)}
                        required
                        className="rounded-sm p-1 border border-slate-300"
                    ></input>            
                </div>
            </div>

            <div class="flex flex-row-reverse pt-2">
                <Button
                    type="button"
                    onClick={handleClick}
                    text="Delete"
                    color="red"
                    paddingX={4}
                    paddingY={1.5}
                ></Button>            
            </div>
           
        </div>
    )
}

export default EditContentCard;
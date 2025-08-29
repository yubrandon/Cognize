import Button from "../buttons/Button";

const CreateCardInput = ({val, index, handleDelete}) => {
    const onDelete = () => {
        handleDelete(val);
    }
    return (
        <div card-index={index} className="flex flex-col bg-neutral-50 pl-10 pr-16 py-4 rounded-lg shadow-md gap-1">
            <div className="flex flex-row-reverse mb-1">
                <p className="">{index+1}</p>
            </div>
            <div className="flex flex-row gap-6">
                <div className="flex flex-row items-center gap-2">
                    <label htmlFor={`term${index}`}>Term</label>
                    <input type="text" id={`term${index}`} name={`term${index}`}
                        required
                        className="rounded-sm p-1 border border-slate-300"
                    ></input>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <label htmlFor={`definition${index}`}>Definition</label>
                    <input type="text" id={`definition${index}`} name={`definition${index}`}
                    required
                        className="rounded-sm p-1 border border-slate-300"
                    ></input>
                </div>            
            </div>
            <div className="flex flex-row-reverse pt-2 mt-1">
                <Button type="button" onClick={onDelete} text="Delete" color="red" paddingX={4} paddingY={1.5}></Button>
            </div>        
        </div>
    )
}   

export default CreateCardInput;
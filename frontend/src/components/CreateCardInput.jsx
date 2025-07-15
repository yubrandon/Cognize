const CreateCardInput = ({val, index, handleDelete}) => {
    const onDelete = () => {
        handleDelete(val);
    }
    return (
        <div card-index={index}>
            <p>{index+1}</p>
            <label htmlFor={`term${index}`}>Term</label>
            <input type="text" id={`term${index}`} name={`term${index}`}></input>
            <label htmlFor={`definition${index}`}>Definition</label>
            <input type="text" id={`definition${index}`} name={`definition${index}`}></input>
            <button type="button" onClick={onDelete}>Delete</button>
        </div>
    )
}   

export default CreateCardInput;
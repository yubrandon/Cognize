const CreateCardInput = ({val, index, handleDelete}) => {
    const onDelete = () => {
        handleDelete(val);
    }
    return (
        <div card-index={index}>
            <p>{index+1}</p>
            <label htmlFor={`term${val}`}>Term</label>
            <input type="text" id={`term${val}`} name={`term${val}`}></input>
            <label htmlFor={`def${val}`}>Definition</label>
            <input type="text" id={`def${val}`} name={`def${val}`}></input>
            <button type="button" onClick={onDelete}>Delete</button>
        </div>
    )
}   

export default CreateCardInput;
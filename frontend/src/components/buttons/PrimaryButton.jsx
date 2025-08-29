const PrimaryButton = ({type, onClick, text, classes}) => {
    var newClasses = `!border-none rounded-lg px-5 py-3 bg-indigo-500 text-2xl font-bold text-white hover:bg-indigo-600 hover:shadow-lg ${classes}`
    return (
        <button 
            className={newClasses}
            type={type} 
            onClick={onClick}
        >{text}</button>
    )
}

export default PrimaryButton;
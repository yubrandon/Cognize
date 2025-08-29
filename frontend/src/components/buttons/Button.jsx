const Button = ({type, onClick, text, color, paddingX, paddingY, classes}) => {
    let newClasses = `!border-none px-${paddingX} py-${paddingY} rounded-lg border-none bg-${color}-500 text-white font-semibold hover:bg-${color}-600 hover:shadow-md ${classes}`;
    return <button 
                className={newClasses}
                type={type} 
                onClick={onClick}
                
            >{text}</button>}

export default Button;
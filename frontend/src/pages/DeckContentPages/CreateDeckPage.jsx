import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCardInput from "../../components/deck/CreateCardInput";
import createDeck from "../../api/decks/createDeck";
import formatCards from "../../api/cards/formatCards";
import Button from "../../components/buttons/Button";

const CreateDeckPage = () => {
    const [name, setName] = useState("");
    const [cards, setCards] = useState([0,1]);
    const handleText = (e) => {
        setName(e.target.value);
    }
    const addCard = () => {
        if(cards.length<1000) {
            setCards([...cards, cards.length*Math.random()]);
        }
        else {
            alert("Max deck size reached!");
        }
        
    }
    const handleReturn = () => {
        navigate("./..")
    }
    const handleDelete = (val) => {
        if(cards.length > 2) {
            setCards(cards.toSpliced(cards.indexOf(val),1));
        }
        else {
            alert("Deck must contain at least 2 cards!");
        }
        
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const tempDeck = Object.fromEntries(formData);
        const deckName = tempDeck.dname;
        delete(tempDeck.dname);
        const cards = formatCards(tempDeck);
        const res = await createDeck(deckName, cards);
        if(res.ok) {
            const json = await res.json();
            alert(json.msg);
            navigate("/sets");
        }
        else {
            alert("Error! Try again!");
        }
        
    }

    return (
        <div className="flex ml-5 px-8 pt-4">
            <form onSubmit={handleSubmit}>
                <div className="mt-3 mb-5">
                    <label htmlFor="dname" 
                        className="flex flex-col text-3xl font-medium mb-2"
                    >Deck Name</label>
                    <input type="text" id="dname" name="dname" onChange={handleText} value={name} required
                        className="rounded-sm p-1 border border-slate-500"
                    ></input>
                </div>
                <p className="text-3xl font-medium mb-2">Cards</p>
                <div className="flex flex-col gap-4 mt-2 mb-4">
                {
                    cards.map((val, index) => {
                        return <CreateCardInput 
                                    key={val}
                                    val={val}
                                    index={index}
                                    handleDelete={handleDelete}/>
                    })
                }
                </div>            
            <Button type="button" onClick={addCard} text="Add a Card" color="green" paddingX={6} paddingY={2} classes=""></Button>
            <div className="py-3 flex flex-row items-center gap-5">
                <Button type="button" onClick={handleReturn} text="Return" color="slate" paddingX={5} paddingY={1.5}></Button>
                <Button type="submit" text="Submit" color="indigo" paddingX={6} paddingY={1.5}></Button>               
            </div>
  
            </form>
           
        </div>
    )
}

export default CreateDeckPage;
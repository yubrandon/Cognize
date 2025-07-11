import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCardInput from "../components/CreateCardInput";
import createDeck from "../api/createDeck";
import formatCards from "../api/formatCards";

const CreateDeckPage = () => {
    const [name, setName] = useState("");
    const [cards, setCards] = useState([0]);
    const handleText = (e) => {
        setName(e.target.value);
    }
    const addCard = () => {
        setCards([...cards, cards.length*Math.random()]);
    }
    const handleDelete = (val) => {
        if(cards.length > 1) {
            setCards(cards.toSpliced(cards.indexOf(val),1));
        }
        
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // Parse form data and make POST request to api
        const deck = Object.fromEntries(formData);
        const deckName = deck.dname;
        delete(deck.dname);
        //console.log(deckName, deck);
        const cards = formatCards(deck);
        const res = await createDeck(deckName, cards);
        if(res.ok) {
            alert("Success!");
            navigate("/sets");
        }
        else {
            alert("Error! Try again!");
        }
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dname">Deck Name:</label>
                    <input type="text" id="dname" name="dname" onChange={handleText} value={name}></input>
                    <button type="submit">Submit</button>                
                </div>

                {
                    cards.map((val, index) => {
                        return <CreateCardInput 
                                    key={val}
                                    val={val}
                                    index={index}
                                    handleDelete={handleDelete}/>
                    })
                }
            </form>
            <button onClick={addCard}>Add a Card</button>
        </div>
    )
}

export default CreateDeckPage;
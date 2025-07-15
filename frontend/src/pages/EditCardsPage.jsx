import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCards from "../api/getCards";
import CardEditCard from "../components/cards/CardEditCard";
import formatCards from "../api/formatCards";
import editDeck from "../api/editDeck";

const EditCardsPage = () => {
    const { deckId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deckName, setDeckName] = useState('');
    const [newCards, setNewCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            const deckData = await getCards(deckId)
                .catch((error) => setError(error));
            if(!error) {
                if(deckData) {
                    setData(deckData.cards);
                    setDeckName(deckData.name);
                }
            }
            setLoading(false);
        }
        fetchCards();
    }, []);

    const navigate = useNavigate();
    const handleDelete = (index) => {
        setData(data.toSpliced(index,1));
    }
    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const deck = Object.fromEntries(formData);
        const dname = deck.deckName;
        delete(deck.deckName);
        const newCards = formatCards(deck);
        const res = await editDeck(deckId, dname, newCards);
        if(res.ok) {
            const json = await res.json();
            alert(json.msg);
            navigate('./..');
        }
        else {
            alert('Error! Try again!');
        }
    }
    const handleCancel = () => {
        navigate("./..")
    }
    const addCard = () => {
        setData([...data, {term: '', definition:''}]);
    }
    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>{error}</h1>
    return (
        <div>
            <form onSubmit={handleSave}>
                <label htmlFor="deckName">Deck Name</label>
                <input type="text" id="deckName" name="deckName"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                ></input>
            {
                data.map((card, index) => {
                    return (
                        <CardEditCard 
                            key={card.id}
                            deckId={deckId}
                            cardId={card.id}
                            term={card.term}
                            def={card.definition}
                            index={index}
                            handleDelete={handleDelete}
                        />
                    )
                })
            }
            <button type="button"
                    onClick={addCard}
            >Add a Card</button>
            <div>
                <button 
                    type="submit"
                >Save Changes
                </button>
                <button 
                    type="button"
                    onClick={handleCancel}
                >Cancel
                </button>
            </div>
            </form>
            
        </div>
    )
}

export default EditCardsPage;
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCards from "../api/getCards";
import CardEditCard from "../components/cards/CardEditCard";

const EditCardsPage = () => {
    const { deckId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deckName, setDeckName] = useState('');
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
    const handleDelete = () => {

    }
    const handleSave = () => {
        
    }
    const handleCancel = () => {
        navigate("./..")
    }
    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>{error}</h1>
    return (
        <div>
            <form>
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
            </form>
            <button 
                type="button"
                onClick={handleSave}
            >Save Changes
            </button>
            <button 
                type="button"
                onClick={handleCancel}
            >Cancel
            </button>
        </div>
    )
}

export default EditCardsPage;
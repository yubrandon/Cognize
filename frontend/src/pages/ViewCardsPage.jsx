import { useState, useEffect } from "react";
import getCards from "../api/getCards";
import { useParams, useNavigate } from "react-router-dom";
import CardViewCard from "../components/cards/CardViewCard";

const ViewCardsPage = () => {
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
                    setDeckName(deckData.name);
                    setData(deckData.cards);
                }
            }
            setLoading(false);
        }
        fetchCards();
    }, []);

    const navigate = useNavigate();
    const handleReturn = () => {
        navigate("/sets");
    }
    const handleEdit = () => {
        navigate("./edit")
    }

    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>{error}</h1>
    return (
        <div>
            <h1>{deckName}</h1>
            {
                data.map((card, index) => {
                    return <CardViewCard 
                        key={card.id}
                        id={card.id}
                        term={card.term}
                        definition={card.definition}
                        index={index}
                    />
                })
            }

            <button
                type="button"
                onClick={handleReturn}
            >Return</button>
            <button
                type="button"
                onClick={handleEdit}
                >
                Edit Deck
            </button>
        </div>
    )
}

export default ViewCardsPage;
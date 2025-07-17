import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import getDecks from "../../api/decks/getDecks";
import DeckViewCard from "../../components/cards/DeckViewCard";

const ViewDecksPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cardData, setCardData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const decks = await getDecks()
                .catch((error) => setError(error));
            decks.length ? setCardData(decks) : setCardData(false);
            setIsLoading(false);
        }
        fetchData();
    },[]);

    if(isLoading) return <h1>Loading...</h1>
    if(error) return <h1>Error!</h1>

    return (
        <>
            <div>
                <h1>Your Study Sets</h1>
                <button><Link to="./create">Create Set</Link></button>
                {
                    cardData ?
                        cardData.map((deck) => {
                            return (
                                <DeckViewCard 
                                    key={deck.id}
                                    deckId={deck.id}
                                    deckName={deck.name}
                                />
                            )
                        }) :
                        <p>No sets created yet!</p>
                }
            </div>
        </>
    )
}

export default ViewDecksPage;
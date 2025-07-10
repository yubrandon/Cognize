import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import getDecks from "../api/getDecks";
import DeckViewCard from "../components/cards/DeckViewCard";

const ViewDeckPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const decks = await getDecks()
                .catch((error) => setError(error));
            decks ? setData(decks) : setData(false);
            setIsLoading(false);
        }
        fetchData();
    },[]);
    return (
        <>
            <div>
            { isLoading ? <h1>Loading...</h1> :
                
                error ? <h1>Error!</h1> : 
                
            (<>
            
                <h1>Your Study Sets</h1>
                <button><Link to="./create">Create Set</Link></button>
                {
                    data ?
                        data.map((deck) => {
                            return (
                                <DeckViewCard 
                                    key={deck.id}
                                    deckName={deck.name}
                                />
                            )
                        }) :
                        <p>No sets created yet!</p>
                }
            </>)
            }
            </div>
        </>
    )
}

export default ViewDeckPage;
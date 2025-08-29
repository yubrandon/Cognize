import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import getDecks from "../../api/decks/getDecks";
import DeckViewCard from "../../components/deck/DeckViewCard";
import PrimaryButton from "../../components/buttons/PrimaryButton";

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

    if(isLoading) return <h1 className="flex flex-row justify-center p-3">Loading decks...</h1>
    if(error) return <h1 className="flex flex-row justify-center p-3">Error! Try again later!</h1>

    return (
        <div className="flex flex-col pt-2 items-center">
            <div className="flex flex-col items-center py-2">
                <h1 className="pt-4 pb-6 text-5xl font-bold">Your Study Sets</h1>
                <div className="py-2">
                    <Link to="./create">
                        <PrimaryButton type="button" text="Create a Set" width={6} height={3}></PrimaryButton>
                    </Link>
                </div>
            </div>
                <div className="flex flex-col justify-center px-3 py-2 w-3/5">
                    <div className="flex flex-col gap-5">
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
            </div>
        </div>
    )
}

export default ViewDecksPage;
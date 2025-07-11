import { useState, useEffect } from "react";
import getCards from "../api/getCards";
import { useParams, useNavigate } from "react-router-dom";
import CardViewCard from "../components/cards/CardViewCard";

const ViewCardsPage = () => {
    const { deckId } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchCards = async () => {
            const cardsData = await getCards(deckId)
                .catch((error) => setError(error));
                cardsData ? setData(cardsData.cards) : setData(false);
            setIsLoading(false);
        }
        fetchCards();
    }, []);

    const navigate = useNavigate();
    const handleReturn = () => {
        navigate("/sets");
    }

    if(isLoading) return <h1>Loading...</h1>
    if(error) return <h1>Error loading data!</h1>
    return (
        <div>
            {
                data.map((card) => {
                    return <CardViewCard 
                        key={card.id}
                        id={card.id}
                        term={card.term}
                        def={card.def}
                    />
                })
            }
            <button
                type="button"
                onClick={handleReturn}
            >Return</button>
        </div>
    )
}

export default ViewCardsPage;
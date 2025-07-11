import { useNavigate } from "react-router-dom";

const DeckViewCard = (({deckId, deckName}) => {
    const navigate = useNavigate();
    const handleView = () => {
        navigate(`${deckId}`);
    }
    return (
        <div className="deck-card">
            <p>Deck: {deckName}</p>
            <button
                type="button"
                onClick={handleView}
            >View</button>
        </div>
    )
})

export default DeckViewCard;
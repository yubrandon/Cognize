import { useNavigate } from "react-router-dom";
import deleteDeck from "../../api/deleteDeck";

const DeckViewCard = (({deckId, deckName}) => {
    const navigate = useNavigate();
    const handleView = () => {
        navigate(`${deckId}`);
    }
    const handleDelete = async () => {
        const res = await deleteDeck(deckId);
        if(res.ok) {
            alert('Deck deleted!');
            window.location.reload();
        }
    }
    return (
        <div className="deck-card">
            <p>Deck: {deckName}</p>
            <div>
                <button
                    type="button"
                    onClick={handleView}
                >View</button>
                <button
                    type="button"
                    onClick={handleDelete}
                >Delete
                </button>
            </div>
        </div>
    )
})

export default DeckViewCard;
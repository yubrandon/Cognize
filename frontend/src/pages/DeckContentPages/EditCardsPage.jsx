import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditContentCard from "../../components/deck/EditContentCard";
import getCards from "../../api/cards/getCards";
import formatCards from "../../api/cards/formatCards";
import editDeck from "../../api/decks/editDeck";
import Button from "../../components/buttons/Button";

const EditCardsPage = () => {
    const { deckId } = useParams();
    const [cardData, setCardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deckName, setDeckName] = useState('');

    useEffect(() => {
        const fetchCards = async () => {
            const deckData = await getCards(deckId)
                .catch((error) => setError(error));
            if(!error) {
                if(deckData) {
                    setCardData(deckData.cards);
                    setDeckName(deckData.name);
                }
            }
            setLoading(false);
        }
        fetchCards();
    }, []);

    const navigate = useNavigate();
    const handleDelete = (index) => {
        setCardData(cardData.toSpliced(index,1));
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
        if(cardData.length < 1000) {
            setCardData([...cardData, {id: -1, term: '', definition:''}]);
        }
        else {
            alert("Max deck size reached!");
        }
        
    }
    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>{error}</h1>
    return (
        <div className="flex ml-5 px-8 pt-4">
            <form onSubmit={handleSave}>
                <label htmlFor="deckName"
                    className="flex flex-col text-3xl font-medium mb-2"
                >Deck Name</label>
                <input type="text" id="deckName" name="deckName"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    className="rounded-sm p-1"
                ></input>
            <p className="text-3xl font-medium mb-2">Cards</p>
            <div className="flex flex-col gap-4 mt-2 mb-4">
            {
                cardData.map((card, index) => {
                    return (
                        <EditContentCard 
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
            </div>
            <div className="flex pt-2">
                <Button type="button"
                        onClick={addCard}
                        text="Add a Card +"
                        color="green"
                        paddingY={2}
                        classes="w-1/3"
                ></Button>            
            </div>
            <div className="flex flex-row gap-3 py-2">
                <Button 
                    type="submit"
                    text="Save Changes"
                    color="indigo"
                    paddingY={2}
                    classes="w-1/3"
                ></Button>
                <Button 
                    type="button"
                    onClick={handleCancel}
                    text="Cancel"
                    color="red"
                    paddingY={2}
                    classes="w-1/4"
                ></Button>
            </div>
            </form>
            
        </div>
    )
}

export default EditCardsPage;
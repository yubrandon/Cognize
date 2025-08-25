import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getCards from "../../api/cards/getCards";
import CarouselCard from "../../components/deck/CarouselCard";

const DeckCarouselPage = () => {
    const { deckId } = useParams();
    const [cardList, setCardList] = useState([]);
    const [deckName, setDeckName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cardIndex, setCardIndex] = useState(0);

    useEffect(() => {
        const fetchCards = async () => {
            const deckData = await getCards(deckId)
                .catch((error) => setError(error));
            if(!error) {
                if(deckData) {
                    const cardArray = await Array.from(deckData.cards);
                    setDeckName(deckData.name);
                    setCardList(cardArray);
                    console.log(cardList);
                }
            }
            setLoading(false);
        }
        fetchCards();
    }, []);

    const handleDecrement = () => {
        if(cardIndex > 0) setCardIndex(cardIndex - 1);
    }
    const handleIncrement = () => {
        if(cardIndex < cardList.length - 1) setCardIndex(cardIndex + 1);
    }

    return (
        <div>

        <button type="button" onClick={handleDecrement}>left</button>
        <CarouselCard card={cardList[cardIndex]} />
        <button type="button" onClick={handleIncrement}>right</button>
        </div>
    )
}


export default DeckCarouselPage;
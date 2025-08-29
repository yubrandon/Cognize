import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCards from "../../api/cards/getCards";
import CarouselCard from "../../components/deck/CarouselCard";

const DeckCarouselPage = () => {
    const { deckId } = useParams();
    const [cardList, setCardList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cardIndex, setCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCards = async () => {
            const deckData = await getCards(deckId)
                .catch((error) => setError(error));
            if(!error) {
                if(deckData) {
                    const cardArray = await Array.from(deckData.cards);
                    setCardList(cardArray);
                }
            }
            setLoading(false);
        }
        fetchCards();
    }, []);

    const handleDecrement = () => {
        if(cardIndex > 0) {
            setCardIndex(cardIndex - 1);
            setFlipped(false);
        }
    }
    const handleIncrement = () => {
        if(cardIndex < cardList.length - 1) {
            setCardIndex(cardIndex + 1);
            setFlipped(false);
        }
    }
    const handleReturn = () => {
        navigate(`/sets/${deckId}`);
    }
    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>{error}</h1>
    return (
        <>
            <div className="relative w-screen h-screen">
                <div className="absolute inset-0 bg-neutral-900 z-0"></div>
                <div className="absolute flex flex-row-reverse top-0 right-0 z-10 hover:opacity-70" onClick={handleReturn}>
                    <img src="/src/static/x.svg"
                        className="invert w-8 m-5"
                    ></img>
                </div>

                <div className="absolute top-0 left-0 w-full h-full flex flex-row items-center justify-center gap-5">
                    <div onClick={handleDecrement} className="flex flex-row h-1/5 mx-5 hover:opacity-70">
                        <img src="/src/static/angle-left.svg"
                            className="invert"
                        ></img>
                    </div>
                    <div className="flex w-1/2 h-1/2">
                        <CarouselCard card={cardList[cardIndex]} flipped={flipped} setFlippped={setFlipped}/>
                    </div>     
                    <div onClick={handleIncrement} className="flex flex-row h-1/5 mx-5 hover:opacity-70">
                        <img src="/src/static/angle-right.svg"
                            className="invert"
                        ></img>
                    </div>                
                </div>
            </div>

        </>

    )
}


export default DeckCarouselPage;
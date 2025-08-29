import { useState, useEffect } from "react";
import getCards from "../../api/cards/getCards";
import { useParams, useNavigate } from "react-router-dom";
import StudyViewCard from "../../components/deck/StudyViewCard";
import Button from "../../components/buttons/Button";

const ViewCardsPage = () => {
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
                    setDeckName(deckData.name);
                    setCardData(deckData.cards);
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
    const handleQuiz = async () => {
        navigate("./quiz");
    }
    const handleReview = () => {
        navigate("./review");
    }

    if(loading) return <h1 className="flex flex-row justify-center p-3">Loading cards...</h1>
    if(error) return <h1>{error}</h1>
    return (
        <div className="flex flex-col items-start p-5 ml-7">
            <h1 className="text-6xl font-bold py-3 w-1/2">{deckName}</h1>
            <div className="flex flex-row gap-4 justify-start w-xl pb-2">
                <Button
                    type="button"
                    onClick={handleQuiz}
                    text="Quiz Me!"
                    color="indigo"
                    paddingY={2}
                    classes="w-1/4"
                ></Button>
                <Button
                    type="button"
                    onClick={handleReview}
                    text="Review"
                    color="green"
                    paddingY={2}
                    classes="w-1/4"
                ></Button>            
            </div>
            <div className="flex flex-col py-2 gap-4">
            {
                cardData.map((card, index) => {
                    return <StudyViewCard 
                        key={card.id}
                        term={card.term}
                        definition={card.definition}
                        index={index}
                    />
                })
            }
            </div>
            <div className="flex flex-row gap-4 pt-2">
                <Button
                    type="button"
                    onClick={handleReturn}
                    text="Return"
                    color="slate"
                    paddingX={5}
                    paddingY={2}
                ></Button>
                <Button
                    type="button"
                    onClick={handleEdit}
                    text="Edit Deck"
                    color="amber"
                    paddingX={5}
                    paddingY={2}
                ></Button>
            </div>
        </div>
    )
}

export default ViewCardsPage;
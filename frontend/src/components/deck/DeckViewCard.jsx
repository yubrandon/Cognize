import { useNavigate } from "react-router-dom";
import deleteDeck from "../../api/decks/deleteDeck";
import Button from "../buttons/Button";

const DeckViewCard = (({deckId, deckName}) => {
    const navigate = useNavigate();
    const handleView = () => {
        navigate(`${deckId}`);
    }
    const handleDelete = async () => {
        const res = await deleteDeck(deckId);
        if(res.ok) {
            const json = await res.json();
            alert(json.msg);
            window.location.reload();
        }
    }
    return (
        <div className="flex flex-row justify-between px-5 py-4 border border-slate-400 rounded-lg bg-slate-300 shadow-md">
            <h1 className="text-lg font-bold">{deckName}</h1>
            <div className="flex flex-row gap-10">
                <Button
                    type="button"
                    onClick={handleView}
                    text="View"
                    color="indigo"
                    paddingX={"6"}
                    paddingY={1.5}
                ></Button>
                <Button
                    type="button"
                    onClick={handleDelete}
                    text="Delete"
                    color="red"
                    paddingX={4}
                    paddingY={1.5}
                ></Button>
            </div>
        </div>
    )
})

export default DeckViewCard;
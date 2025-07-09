import { Link } from "react-router-dom";
import createDeck from "../utils/createDeck";

const temp = [];
const ViewSetsPage = () => {
    const handleClick = () => {
        createDeck(1);
    }
    return (
        <>
            <div>
                <h1>Your Study Sets</h1>
                <button><Link to="./create">Create Set</Link></button>
                {
                    temp.length ?
                        temp.map((deck) => {
                            return (
                                <>
                                    <p>{deck.name}</p>
                                </>
                            )
                        }) :
                        <p>No sets created yet!</p>
                }
            </div>
            <button type="button" onClick={handleClick}>test</button>
        </>
    )
}

export default ViewSetsPage;
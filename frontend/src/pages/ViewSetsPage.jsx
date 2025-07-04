import { Link } from "react-router-dom";

const temp = [];
const ViewSetsPage = () => {
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
        </>
    )
}

export default ViewSetsPage;
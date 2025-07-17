// Fetch all cards associated with a deck id
const getCards = async (deckId) => {
    const url = `${import.meta.env.VITE_API_URL}/decks/${deckId}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const cards = await response.json();
    return cards;
}
export default getCards;
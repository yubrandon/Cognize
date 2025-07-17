const editDeck = async (deckId, deckName, cards) => {
    const url = `${import.meta.env.VITE_API_URL}/decks/${deckId}`;
    const response = await fetch(url, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            deckName: deckName,
            cards: cards
        })
    });
    return response;

}
export default editDeck;
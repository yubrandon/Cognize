const deleteDeck = async (deckId) => {
    const url = `${import.meta.env.VITE_API_URL}/decks/${deckId}`;
    const response = await fetch(url, {
        method:"DELETE"
    });
    return response;
}

export default deleteDeck;
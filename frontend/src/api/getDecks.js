const getDecks = async () => {
    const url = `${import.meta.env.VITE_API_URL}/decks`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();
    return json.decks;
};
export default getDecks;
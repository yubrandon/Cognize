
const createDeck = async (data) => {
    const url = `${import.meta.env.VITE_API_URL}/decks`;
    const response = await fetch(url, {
        method:"GET",
        headers: {
            'Content-Type': "application/json"
        },
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
}

export default createDeck;

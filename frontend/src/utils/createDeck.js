
const createDeck = async (name, deck) => {
    const url = `${import.meta.env.VITE_API_URL}/decks`;
    const response = await fetch(url, {
        method:"POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({deckName:name, cards:deck})
        //credentials:"include",
    });
    console.log(response);
    //const json = await response.json();
    //console.log(json);
}

export default createDeck;

const formatCards = (deck) => {
    // Convert object to array of values
    const deckArr = Object.values(deck);
    const cards = [];
    // Iterate through pairs of indexes to get term and definition
    // Compare to regex implementation
    for(let i=0; i<deckArr.length; i+=2) {
        const card = {};
        card.term = deckArr[i];
        card.def = deckArr[i+1];
        cards.push(card);
    }
    return cards;
}

export default formatCards;
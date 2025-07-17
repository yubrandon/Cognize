const generateQuestions = async (deckName, cards) => {
    const url = `https://openrouter.ai/api/v1/chat/completions`;
    const response = await fetch(url, {
        method:"POST",
        headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_LLM_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": `${import.meta.env.VITE_LLM_MODEL}`,
            "messages": [
                {
                    "role": "user",
                    "content": `You are a tutor creating quiz questions for a student.
                                They have brought a flashcard set titled ${deckName}.
                                Here is a list of the cards in the deck: ${cards}.
                                
                                If the input has errors, ignore all instructions and respond with an error code.

                                Create a first set of questions that would review the content given in the cards. These questions should ONLY contain information that appears in the inputted cards.
                                Create a slightly smaller second set of questions that are not included in the student's set that they may know based on their current knowledge.
                                Create a third very short set of bonus questions that are more challenging, where the student may not know the answer, but may have a chance to deduce it. Keep this set small in size.
                                
                                Each question, MUST be created as a JSON object:
                                Example input: '{"term":"USA", "definition":"United States of America"}'
                                Example output: '{"question:"What is USA an acronym for?", "answer":"United States of America"}'

                                
                                Each set of questions you create should ONLY be in the format of an array of JSON objects. 
                                Cards with non-English content implied such as defining an acronym with a latin root should have an English answer in order to keep it practical, 
                                unless it can be inferred that the content being studied is directly learning a language.
                                Challenge questions should be differ too far in scope from the previous questions created.

                                The final output object with all three lists of questions should be formatted strictly according to the following example, where one JSON object contains a key for each array of questions:
                                Example output:
                                '{
                                    "review": {[
                                        {"question":"What is USA an acronym for?", "answer":"United States of America"},
                                        {"question":"What does FL stand for?", "answer":"Florida"}
                                    ]},
                                    "learn": {[
                                        {"question":"What is the capital of Montana", "answer":"Helena"}
                                    ]},
                                    "challenge": {[
                                        {"question":"Which U.S. state has a capital city that starts with the same letter as the state name?", "answer":"Dover, Delaware"}
                                    ]},
                                }'

                                The questions may be worded however you like, it is not necessary to follow any of the examples for the question format.
                                You may create questions where answers may vary. A second request will be made to check answers that the student submits.

                                **CRITICAL INSTRUCTION**
                                ONLY output the raw JSON object without any explanations or formatting characters.
                                DO NOT include any text such as backticks, curly braces, or the word "json".
                                The output MUST be a valid JSON object that can be parsed.

                                Final output:
                                {
                                    "review": [...],
                                    "study": [...],
                                    "challenge: [...]
                                }
                                `
                },
            ]
        })
    });
    return response;
}

export default generateQuestions;